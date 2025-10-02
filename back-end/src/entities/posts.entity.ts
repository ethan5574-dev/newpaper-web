import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Users } from './users.entity';


@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ nullable: true })
  author_id: number;

  @Column({ type: 'int', default: 0 })
  total_view_count: number;

  @Column({ length: 255 })
  title: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  isDeleted: boolean;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, user => user.posts)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'user_id' })
  author: Users;
}
