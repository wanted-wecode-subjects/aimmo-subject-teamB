import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Forum } from './post.schema';
import { PostService } from './post.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Forum> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string, @GetUser() user: User): Promise<Forum> {
    return this.postService.getPostById(id, user);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ): Promise<Forum> {
    return this.postService.updatePost(id, updatePostDto, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.postService.deletePost(id, user);
  }
}
