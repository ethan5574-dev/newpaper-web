import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'post_views' })
@Index('UX_post_bucket', ['post_id', 'bucket_start'], { unique: true })
export class PostViews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @Column({ nullable: true })
  view_count: number;

  @Column({ type: 'timestamp' })
  bucket_start: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
