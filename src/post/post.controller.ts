import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Forum } from './post.schema';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<Forum> {
    return this.postService.createPost(createPostDto);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<Forum> {
    return this.postService.getPostById(id);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Forum> {
    return this.postService.updatePost(id, updatePostDto);
  }
}
