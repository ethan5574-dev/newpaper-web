import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostViews } from 'src/entities/post_views';
import { Post } from 'src/entities/posts.entity';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostViews, Post])],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}