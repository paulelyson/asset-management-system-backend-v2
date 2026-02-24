import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DepartmentDocument = HydratedDocument<Department>;

@Schema({ timestamps: true })
export class Department {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true
  })
  code: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'school',
    required: true,
  })
  school: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  deleted?: boolean;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
