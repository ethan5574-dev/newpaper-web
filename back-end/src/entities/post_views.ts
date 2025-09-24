import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Post } from './posts.entity';

@Entity({ name: 'post_views' })
export class PostViews {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ nullable: true })
  view_count: number;

  @OneToMany(() => Post, post => post.post_id)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
