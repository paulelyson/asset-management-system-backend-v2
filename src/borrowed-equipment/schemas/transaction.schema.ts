import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class Transaction {
  @Prop({
    type: Types.ObjectId,
    ref: 'Equipment',
    required: true,
  })
  equipment: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  quantity: number;

  @Prop({
    type: String,
    required: true,
  })
  condition: string; // You can replace with enum if needed

  @Prop({
    type: String,
  })
  remarks?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);