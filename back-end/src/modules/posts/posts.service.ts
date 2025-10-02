import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Post } from '../../entities/posts.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostViews } from 'src/entities/post_views';

export interface TopPostResult {
  post_id: number;
  title: string;
  content: string;
  author_id: number;
  total_view_count: number;
  image_url: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    user_id: number;
    email: string;
    username: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  total_views_in_period: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostViews)
    private readonly viewRepository: Repository<PostViews>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [posts, total] = await this.postRepository.findAndCount({
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByAuthor(userId: number, page: number = 1, limit: number = 10): Promise<{
    data: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [posts, total] = await this.postRepository.findAndCount({
      where: { author: { user_id: userId } },
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  return {
    data: posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { post_id: id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async getTopPostsByViews(time: number, quantity: number = 10): Promise<TopPostResult[]> {
    const startDate = new Date(Date.now() - time * 24 * 60 * 60 * 1000);
    
    
    // Debug: Kiểm tra dữ liệu trong post_views
    const allViews = await this.viewRepository.find();
    
    const viewsInPeriod = await this.viewRepository.find({
      where: {
        bucket_start: MoreThanOrEqual(startDate)
      }
    });
    
    // Sử dụng getRawMany() và map thủ công
    const rawResults = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post_views', 'pv', 'pv.post_id = post.post_id')
      .leftJoin('users', 'author', 'author.user_id = post.author_id')
      .where('pv.bucket_start >= :startDate', { startDate })
      .groupBy('post.post_id')
      .addGroupBy('author.user_id')
      .addGroupBy('author.email')
      .addGroupBy('author.username')
      .addGroupBy('author.role')
      .addGroupBy('author.createdAt')
      .addGroupBy('author.updatedAt')
      .addGroupBy('post.author_id')
      .addGroupBy('post.total_view_count')
      .addGroupBy('post.title')
      .addGroupBy('post.image_url')
      .addGroupBy('post.isDeleted')
      .addGroupBy('post.content')
      .addGroupBy('post.createdAt')
      .addGroupBy('post.updatedAt')
      .select([
        'post.*',
        'author.*',
        'SUM(pv.view_count) as total_views_in_period'
      ])
      .orderBy('total_views_in_period', 'DESC')
      .limit(quantity)
      .getRawMany();

    
    // Map raw results thành objects
    const posts: TopPostResult[] = rawResults.map(raw => ({
      post_id: raw.post_id,
      title: raw.title,
      content: raw.content,
      author_id: raw.author_id,
      total_view_count: raw.total_view_count,
      image_url: raw.image_url,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      author: raw.user_id ? {
        user_id: raw.user_id,
        email: raw.email,
        username: raw.username,
        role: raw.role,
        createdAt: raw.author_createdAt,
        updatedAt: raw.author_updatedAt,
      } : null,
      total_views_in_period: parseInt(raw.total_views_in_period) || 0,
    }));

    
    return posts;
  }

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      author: { user_id: userId } as any, // Gán author từ JWT token
    });
    return this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<Post> {
    const post = await this.findOne(id);
    
    // Kiểm tra quyền sở hữu (chỉ author mới được update)
    if (post.author.user_id !== userId) {
      throw new NotFoundException('You can only update your own posts');
    }
    
    Object.assign(post, updatePostDto);



    
    return this.postRepository.save(post);
  }

  async remove(id: number, userId: number): Promise<void> {
    const post = await this.findOne(id);
    
    // Kiểm tra quyền sở hữu (chỉ author mới được delete)
    if (post.author.user_id !== userId) {
      throw new NotFoundException('You can only delete your own posts');
    }
    
    await this.postRepository.remove(post);
  }
}
