import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class DateOfUse {
  @Prop({ type: Date, required: true })
  start: Date;

  @Prop({ type: Date, required: true })
  end: Date;
}

export const DateOfUseSchema = SchemaFactory.createForClass(DateOfUse);