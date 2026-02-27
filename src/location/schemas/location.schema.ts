import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { LocationType } from "../enums/location-types.enum";

export type LocationDocument =  HydratedDocument<Location>;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true, trim: true, uppercase: true })
  name: string;

  @Prop({
    type: String,
    enum: Object.values(LocationType),
    required: true,
  })
  type: LocationType;

  @Prop({ required: false, trim: true })
  building?: string;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  department?: Types.ObjectId;
}

export const LocationSchema = SchemaFactory.createForClass(Location);