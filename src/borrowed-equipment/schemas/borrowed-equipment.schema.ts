import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { DateOfUse, DateOfUseSchema } from './date-of-use.schema';
import {
  BorrowedEquipmentItem,
  BorrowedEquipmentItemSchema,
} from './borrowed-equipment-item.schema';
import { BorrowPurpose } from '../enums/borrowed-equipment.enum';

export type BorrowedEquipmentDocument = HydratedDocument<BorrowedEquipment>;

@Schema({ timestamps: true })
export class BorrowedEquipment {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  borrower: Types.ObjectId;

  @Prop({
    type: String,
    enum: BorrowPurpose,
    required: true,
  })
  purpose: BorrowPurpose;

  @Prop({
    type: Types.ObjectId,
    ref: 'CourseOffering',
    required: true,
  })
  courseOffering: Types.ObjectId;

  @Prop({ type: String })
  remarks?: string;

  @Prop({
    type: DateOfUseSchema,
    required: true,
  })
  dateOfUse: DateOfUse;

  @Prop({
    type: [BorrowedEquipmentItemSchema],
    default: [],
    validate: {
      validator: (v: BorrowedEquipmentItem[]) => v.length > 0,
      message: 'Must contain at least one requested item',
    },
  })
  borrowedEquipment: BorrowedEquipmentItem[];
}

export const BorrowedEquipmentSchema =
  SchemaFactory.createForClass(BorrowedEquipment);
