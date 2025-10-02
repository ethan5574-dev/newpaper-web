import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from './posts.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ length: 255, unique: true, nullable: false })
  password_hash: string;

  @Column({ length: 120, nullable: true })
  username: string;

  @Column({ 
    length: 10, 
    nullable: false, 
    default: 'user',
    type: 'varchar'
  })
  role: 'user' | 'admin';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}