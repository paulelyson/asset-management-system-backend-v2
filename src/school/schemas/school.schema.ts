import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SchoolDocument =  HydratedDocument<School>

@Schema({ timestamps: true })
export class School {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
