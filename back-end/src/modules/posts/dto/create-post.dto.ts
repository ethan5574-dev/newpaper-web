import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post', description: 'Post title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the content of my post...', description: 'Post content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: true, description: 'Whether the post is published', required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({ 
    example: 'https://bucket.s3.region.amazonaws.com/posts/image.jpg', 
    description: 'Image URL (optional)', 
    required: false 
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  image_url?: string;
}
