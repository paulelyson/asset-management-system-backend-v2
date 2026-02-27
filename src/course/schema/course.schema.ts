import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  code: string;

  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
