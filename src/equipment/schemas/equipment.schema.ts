import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EquipmentCondition,
  EquipmentStatus,
  EquipmentTag,
  Matter,
} from '../enums/equipment.enum';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
export class ConditionAndQuantity {
  @Prop({ enum: EquipmentCondition, required: true })
  condition: EquipmentCondition;

  @Prop({ required: true, min: 0 })
  quantity: number;
}
export const ConditionAndQuantitySchema =
  SchemaFactory.createForClass(ConditionAndQuantity);

@Schema({ _id: false })
export class EquipmentImage {
  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  midsize: string;

  @Prop({ required: true })
  original: string;
}
export const EquipmentImageSchema =
  SchemaFactory.createForClass(EquipmentImage);

/* =======================================
   MAIN SCHEMA
========================================== */

export type EquipmentDocument = HydratedDocument<Equipment>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Equipment {
  @Prop({ trim: true, sparse: true })  // sparse: true allows multiple null values on a unique-like index
  serialNo: string;

  @Prop({ required: true, trim: true, index: true }) // ✅ indexed — used in distinct()
  type: string;

  @Prop({ type: [String], default: [], index: true }) // ✅ indexed — used in distinct()
  categories: string[];

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true, index: true }) // ✅ indexed — used in distinct()
  brand: string;

  @Prop({ trim: true })
  color: string;

  @Prop({ trim: true })
  modelNo: string;

  @Prop({ required: true, min: 0 })
  totalQuantity: number;

  @Prop({ type: [ConditionAndQuantitySchema], default: [] })
  conditionAndQuantity: ConditionAndQuantity[];

  @Prop({ required: true })
  unit: string;

  @Prop({ enum: Matter, default: Matter.SOLID})
  matter: Matter;

  @Prop()
  description: string;

  @Prop({ index: true }) // ✅ indexed if you sort/filter by acquisition date
  dateAcquired: Date;

  @Prop({ type: [EquipmentImageSchema], default: [] })
  images: EquipmentImage[];

  @Prop()
  remarks: string;

  @Prop({ default: false })
  hasTag: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true, index: true }) // ✅ always filter by this
  department: Types.ObjectId;

  @Prop({ enum: EquipmentTag, index: true }) // ✅ indexed — likely filtered
  tag: EquipmentTag;

  @Prop({ type: Types.ObjectId, ref: 'Location', index: true }) // ✅ indexed — likely filtered
  location?: Types.ObjectId;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop()
  warrantyPeriod?: Date;

  @Prop({ default: false, index: true, select: false }) // ✅ indexed — every query filters soft deletes
  deleted?: boolean;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
