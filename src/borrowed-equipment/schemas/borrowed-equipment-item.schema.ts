import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Transaction, TransactionSchema } from "./transaction.schema";

@Schema({ _id: false })
export class BorrowedEquipmentItem {
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
    type: [TransactionSchema],
    default: [],
  })
  transactions: Transaction[];
}

export const BorrowedEquipmentItemSchema =
  SchemaFactory.createForClass(BorrowedEquipmentItem);