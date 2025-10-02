import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from '../../entities/posts.entity';
import { PostViews } from '../../entities/post_views';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostViews]),
    UploadModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService], // Export service để các module khác có thể dùng
})
export class PostsModule {}
