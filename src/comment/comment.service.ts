import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Comment, CommentDocument } from './comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const createdComment = new this.commentModel({
      ...createCommentDto,
      author: user.username,
      comments: [],
      created_at: new Date(),
      updated_at: new Date(),
    });
    return await createdComment.save();
  }

  async findById(id: string) {
    const existedComment = await this.commentModel.findById(id);
    if (!existedComment) {
      throw new NotFoundException('Not found comment');
    }
    return existedComment;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    user: User
  ) {
    const existedComment = await this.findById(id);
    if (existedComment.author !== user.username) {
      throw new UnauthorizedException(`Not comment's author`);
    }

    const { content } = updateCommentDto;
    if (!content) {
      throw new BadRequestException('Empty content');
    }
    existedComment.content = content;
    existedComment.updated_at = new Date();
    return await existedComment.save();
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
