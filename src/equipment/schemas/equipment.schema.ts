import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EquipmentAvailability, EquipmentCondition, EquipmentInventoryType, EquipmentStatus, Matter } from '../enums/equipment.enum';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
export class ConditionAndQuantity {
  @Prop({ enum: EquipmentCondition, required: true })
  condition: EquipmentCondition;

  @Prop({ required: true, min: 0 })
  quantity: number;
}
export const ConditionAndQuantitySchema = SchemaFactory.createForClass(ConditionAndQuantity);

@Schema({ _id: false })
export class EquipmentImage {
  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  midsize: string;

  @Prop({ required: true })
  original: string;
}
export const EquipmentImageSchema = SchemaFactory.createForClass(EquipmentImage);

/* =======================================
   MAIN SCHEMA
========================================== */

export type EquipmentDocument = HydratedDocument<Equipment>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Equipment {
  @Prop({ required: true, unique: true, trim: true })
  serialNo: string;

  @Prop({ required: true, trim: true })
  equipmentType: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
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

  @Prop({ enum: Matter })
  matter: Matter;

  @Prop()
  description: string;

  @Prop({ enum: EquipmentStatus, default: EquipmentStatus.ACQUIRED })
  status: EquipmentStatus;

  @Prop()
  dateAcquired: Date;

  @Prop({ type: [EquipmentImageSchema], default: [] })
  images: EquipmentImage[];

  @Prop()
  remarks: string;

  @Prop({ default: false })
  inventorytag: boolean;

  @Prop()
  checkedBy: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Types.ObjectId;

  @Prop({ enum: EquipmentInventoryType })
  inventorytype: EquipmentInventoryType;

  @Prop()
  location: string;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop()
  warrantyPeriod: Date;

  @Prop({
    enum: EquipmentAvailability,
    default: EquipmentAvailability.AVAILABLE,
  })
  availability: EquipmentAvailability;

  @Prop({ default: false, select: false }) // hidden unless explicitly selected
  deleted?: boolean;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);