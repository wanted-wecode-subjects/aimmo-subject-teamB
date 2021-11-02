import { IsOptional, IsString } from 'class-validator';

export class GetPostsFilterDto {
  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  offset?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
