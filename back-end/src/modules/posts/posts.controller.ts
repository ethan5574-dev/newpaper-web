import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadService } from '../upload/upload.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly uploadService: UploadService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all posts with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.postsService.findAll(pageNum, limitNum);
  }

  @Get('author')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiOperation({ summary: 'Get posts by author' })
  findByAuthor(@Request() req, @Query('page') page?: string, @Query('limit') limit?: string) {
    const userId = req.user.user_id;
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.postsService.findByAuthor(userId, pageNum, limitNum);
  }

  @Get('top-views')
  @ApiOperation({ summary: 'Get top posts by views in specified time period' })
  @ApiQuery({ name: 'time', required: false, type: Number, description: 'Number of days to look back (default: 30)' })
  @ApiQuery({ name: 'quantity', required: false, type: Number, description: 'Number of posts to return (default: 10)' })
  async getTopPosts(
    @Query('time') time?: string,
    @Query('quantity') quantity?: string,
  ) {
    const timeNum = time ? parseInt(time, 10) : 30;
    const quantityNum = quantity ? parseInt(quantity, 10) : 10;
    return this.postsService.getTopPostsByViews(timeNum, quantityNum);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }


  @Post('with-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new post with image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My Post Title' },
        content: { type: 'string', example: 'Post content...' },
        isPublished: { type: 'boolean', example: true },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Post image file',
        },
      },
      required: ['title', 'content'],
    },
  })
  async createWithImage(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
    @Request() req,
  ) {
    const userId = req.user.user_id;

    let imageUrl: string | undefined;

    // Upload image nếu có
    if (image) {
      const uploadResult = await this.uploadService.uploadFile(image, 'posts');
      imageUrl = uploadResult.url;
    }

    // Tạo post với image_url
    const postData = {
      ...createPostDto,
      image_url: imageUrl,
    };

    return this.postsService.create(postData, userId);
  }


  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update post by ID (requires authentication)' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    const userId = req.user.user_id;
    return this.postsService.update(+id, updatePostDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete post by ID (requires authentication)' })
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.user_id;
    return this.postsService.remove(+id, userId);
  }
}
