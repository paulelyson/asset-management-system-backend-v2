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

  /**
   * null when isOpen is true (e.g. field work, OJT, open lab).
   * Stored as "HH:mm" 24-hour format when set.
   */
  @Prop({ type: String, default: null })
  startTime: string | null;

  @Prop({ type: String, default: null })
  endTime: string | null;

  /**
   * Flags a schedule entry that has no fixed time slot.
   * Keeps startTime/endTime types clean (no sentinel strings like "open").
   */
  @Prop({ type: Boolean, default: false })
  isOpen: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Location',
    required: true,
  })
  location: Types.ObjectId;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

// ─── Compound pre-save guard ─────────────────────────────────────────────────
// Enforces: if !isOpen then both times must be present, and vice-versa.
// Doing this at schema level means it's enforced regardless of the entry path
// (API, seeder, direct Mongoose call).
ScheduleSchema.pre('validate', function () {
  const s = this as Schedule;
  if (!s.isOpen && (!s.startTime || !s.endTime)) {
    throw new Error('startTime and endTime are required when isOpen is false.');
  }

  if (s.isOpen && (s.startTime || s.endTime)) {
    throw new Error('startTime and endTime must be null when isOpen is true.');
  }
});

// ─── Course Offering ──────────────────────────────────────────────────────────
@Schema({ timestamps: true })
export class CourseOffering {
  @Prop({ required: true, unique: true, index: true })
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
