import { IsString, IsEnum } from 'class-validator';
import { PostCategories } from '../post-categories.enum';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(PostCategories)
  category: PostCategories;
}
