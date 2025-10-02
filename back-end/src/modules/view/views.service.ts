import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PostViews } from 'src/entities/post_views';
import { Post } from 'src/entities/posts.entity';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(PostViews)
    private readonly postViewsRepository: Repository<PostViews>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
  ) {}
  async incrementView(postId: number) {
    const bucketStart = new Date();
    bucketStart.setHours(0, 0, 0, 0);

    await this.dataSource.transaction(async (manager) => {
      // 1) Try to increment today's bucket
      const updateRes = await manager.getRepository(PostViews).increment(
        { post_id: postId, bucket_start: bucketStart },
        'view_count',
        1,
      );

      if (updateRes.affected && updateRes.affected > 0) {
        // Success: increment total_view_count
        await manager.getRepository(Post).increment(
          { post_id: postId },
          'total_view_count',
          1,
        );
        return;
      }

      // 2) If no row exists, insert a new one with count = 1
      try {
        await manager.getRepository(PostViews).insert({
          post_id: postId,
          bucket_start: bucketStart,
          view_count: 1,
        } as unknown as PostViews);
        
        // Success: increment total_view_count
        await manager.getRepository(Post).increment(
          { post_id: postId },
          'total_view_count',
          1,
        );
        return;
      } catch {
        // 3) Race condition: row was created by another tx, increment again
        await manager.getRepository(PostViews).increment(
          { post_id: postId, bucket_start: bucketStart },
          'view_count',
          1,
        );
        
        // Success: increment total_view_count
        await manager.getRepository(Post).increment(
          { post_id: postId },
          'total_view_count',
          1,
        );
      } 
    });
  }
  async getAllViewCount(postId: number) {
    return await this.postViewsRepository
    .createQueryBuilder('pv')
    .select('SUM(pv.view_count)', 'total')
    .where('pv.post_id = :postId', { postId })
    .getRawOne();      
  }
}