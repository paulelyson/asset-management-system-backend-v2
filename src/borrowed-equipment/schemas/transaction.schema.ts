import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { EquipmentCondition } from 'src/equipment/enums/equipment.enum';
import { BorrowedEquipmentStatus } from '../enums/borrowed-equipment.enum';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  quantity: number;

  @Prop({
    type: String,
    required: true,
    enum: EquipmentCondition
  })
  condition: string; 

  @Prop({
    type: String,
    required: true,
    enum: BorrowedEquipmentStatus
  })
  status: BorrowedEquipmentStatus;

  @Prop({
    type: String,
  })
  remarks?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);