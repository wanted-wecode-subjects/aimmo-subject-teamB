import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.schema';
import { GetUser } from '../auth/get-user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    return this.commentService.create(createCommentDto, user);
  }
  
  @Get('/childComments')
  findByParentCommentId(
    @Query('parentCommentId') parentCommentId: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return this.commentService.findByParentCommentId(parentCommentId, +limit, +offset);
  }
    
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.commentService.findById(id);
  }
    
  @Get()
  findByPostId(
    @Query('postId') postId: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return this.commentService.findByPostId(postId, +limit, +offset);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User
  ) {
    return this.commentService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.commentService.remove(id, user);
  }
}
