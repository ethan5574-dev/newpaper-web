import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsNumber()
  authorId: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
