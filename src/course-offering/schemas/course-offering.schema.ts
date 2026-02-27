import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, HydratedDocument } from 'mongoose';
import { DayOfWeek } from 'src/common/enums/day-of-week.enum';

export type CourseOfferingDocument = HydratedDocument<CourseOffering>;

@Schema({ _id: false })
export class Schedule {
  @Prop({
    type: String,
    enum: Object.values(DayOfWeek),
    required: true,
  })
  day: DayOfWeek;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Location',
    required: true,
  })
  location: Types.ObjectId;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

/**
 * Course Offering Schema
 */
@Schema({ timestamps: true })
export class CourseOffering {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  instructor: Types.ObjectId;

  @Prop({
    type: [ScheduleSchema],
    required: true,
  })
  schedule: Schedule[];
}

export const CourseOfferingSchema =
  SchemaFactory.createForClass(CourseOffering);
