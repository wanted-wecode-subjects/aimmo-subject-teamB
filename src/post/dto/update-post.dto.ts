import { IsString, IsEnum, IsOptional } from 'class-validator';
import { PostCategories } from '../post-categories.enum';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsEnum(PostCategories)
  @IsOptional()
  category: PostCategories;
}
