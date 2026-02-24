import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type UserRole =
  | 'administrator'
  | 'chairman'
  | 'lab_in_charge'
  | 'instructor'
  | 'assistant'
  | 'student';

export type UserStatus =
  | 'pending_approval'
  | 'active'
  | 'deactivated'
  | 'rejected';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, trim: true })
  firstName: string;

  @Prop({ type: String, trim: true })
  middleName?: string;

  @Prop({ type: String, required: true, trim: true })
  lastName: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, required: true, unique: true, index: true, trim: true })
  idNumber: string;

  @Prop([
    {
      role: {
        type: String,
        enum: [
          'administrator',
          'chairman',
          'lab_in_charge',
          'instructor',
          'assistant',
          'student',
        ],
        required: true,
      },
      department: { type: Types.ObjectId, ref: 'Department', required: true },
    },
  ])
  roles: { role: UserRole; department: Types.ObjectId }[];

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: false })
  activated: boolean;

  @Prop({
    type: String,
    enum: ['pending_approval', 'active', 'deactivated', 'rejected'],
    default: 'pending_approval',
  })
  account_status: UserStatus;

  @Prop({ type: Boolean, default: false })
  deleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
