import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { TermStatus } from '../enums/term.enum';

export type TermDocument = HydratedDocument<Term>;

@Schema({ timestamps: true })
export class Term {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  startDate: Date;

  @Prop({
    required: true,
  })
  endDate: Date;

  @Prop({
    type: String,
    enum: Object.values(TermStatus),
    default: TermStatus.PLANNED,
    required: true,
  })
  status: TermStatus;
}

export const TermSchema = SchemaFactory.createForClass(Term);
