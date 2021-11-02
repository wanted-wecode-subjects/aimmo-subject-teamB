import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    createdPost.author = user.username;
    createdPost.created_at = new Date();
    createdPost.updated_at = new Date();
    createdPost.read_count = 1;
    createdPost.user = user;
    createdPost.read_user.push(user.username);

    const result = await createdPost.save();
    result.user = result._id;
    return result;
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<Post> {
    const post = await this.postModel.findOne({ _id: id, user });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    const { title, content, category } = updatePostDto;

    if (!title && !content && !category) {
      throw new BadRequestException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    if (category) {
      post.category = category;
    }

    post.updated_at = new Date();
    return await post.save();
  }

  async deletePost(id: string, user: User): Promise<{ message: string }> {
    const result = await this.postModel.deleteOne({ _id: id, user });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return { message: 'Post deleted' };
  }
}
