import { Schema, model, Types } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Blog';
export const COLLECTION_NAME = 'blogs';

export default interface Blog {
  _id: Types.ObjectId;
  title: string;
  description: string;
  text?: string;
  draftText?: string;
  tags: string[];
  author: User;
  imgUrl?: string;
  blogUrl: string;
  isSubmitted: boolean;
  isDraft: boolean;
  isPublished: boolean;
  status?: boolean;
  publishedAt?: Date;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Blog>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      maxlength: 2000,
      trim: true,
    },
    text: {
      type: Schema.Types.String,
    },
    draftText: {
      type: Schema.Types.String,
    },
    tags: [
      {
        type: Schema.Types.String,
        trim: true,
        uppercase: true,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imgUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    blogUrl: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      maxlength: 200,
      trim: true,
    },
    isSubmitted: {
      type: Schema.Types.Boolean,
      default: false,
      index: true,
    },
    isDraft: {
      type: Schema.Types.Boolean,
      default: true,
      index: true,
    },
    isPublished: {
      type: Schema.Types.Boolean,
      default: false,
      index: true,
    },
    publishedAt: {
      type: Schema.Types.Date,
      index: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  },
);

// schema.index(
//   { title: 'text', description: 'text' },
//   { weights: { title: 3, description: 1 }, background: false },
// );
// schema.index({ _id: 1, status: 1 });
// schema.index({ blogUrl: 1, status: 1 });
// schema.index({ isPublished: 1, status: 1 });
// schema.index({ _id: 1, isPublished: 1, status: 1 });
// schema.index({ tag: 1, isPublished: 1, status: 1 });

export const BlogModel = model<Blog>(DOCUMENT_NAME, schema, COLLECTION_NAME);
