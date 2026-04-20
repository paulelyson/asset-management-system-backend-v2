// schemas/equipment-change-log.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

@Schema({ _id: false })
export class FieldChange {
  @Prop({ required: true })
  field: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  previousValue: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  newValue: any;
}
export const FieldChangeSchema = SchemaFactory.createForClass(FieldChange);

export enum ChangeAction {
  CREATE = 'create',
  UPDATE = 'update',
}

export enum ChangeStatus {
  PENDING   = 'pending',
  APPROVED  = 'approved',
  REJECTED  = 'rejected',
}

export type EquipmentChangeLogDocument = HydratedDocument<EquipmentChangeLog>;

@Schema({ timestamps: true, versionKey: false })
export class EquipmentChangeLog {
  @Prop({ type: Types.ObjectId, ref: 'Equipment', required: true, index: true })
  equipment: Types.ObjectId;

  @Prop({ enum: ChangeAction, required: true })
  action: ChangeAction;

  @Prop({ type: [FieldChangeSchema], default: [] })
  changes: FieldChange[];           // empty array for 'create' action is fine,
                                    // or you can snapshot the whole doc as newValue

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  performedBy: Types.ObjectId;      // the doer / updater

  @Prop({ enum: ChangeStatus, default: ChangeStatus.PENDING, index: true })
  status: ChangeStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  resolvedBy?: Types.ObjectId;      // who approved or rejected

  @Prop({ default: null })
  resolvedAt?: Date;

  @Prop({ default: null })
  resolverRemarks?: string;         // optional note from approver
}

export const EquipmentChangeLogSchema = SchemaFactory.createForClass(EquipmentChangeLog);