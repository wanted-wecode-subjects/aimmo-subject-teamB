import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop()
  author: string;

  @Prop()
  depth: number;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[] | null;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  postId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);