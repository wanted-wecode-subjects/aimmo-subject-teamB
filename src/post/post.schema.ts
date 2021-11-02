import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PostCategories } from './post-categories.enum';

export type PostDocument = Post & mongoose.Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  author: string;

  @Prop()
  category: PostCategories;

  @Prop()
  count: number;

  @Prop()
  read_user: string[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
