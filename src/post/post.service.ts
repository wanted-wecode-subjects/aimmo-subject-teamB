import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    createdPost.created_at = new Date();
    return await createdPost.save();
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    const { title, content, category } = updatePostDto;

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

  async deletePost(id: string): Promise<{ message: string }> {
    const result = await this.postModel.deleteOne({ _id: id });
    console.log(result);

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return { message: 'Post deleted' };
  }
}
