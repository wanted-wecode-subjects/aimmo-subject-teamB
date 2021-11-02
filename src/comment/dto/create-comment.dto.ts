import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  depth: number;

  @IsString()
  postId: string;
}
