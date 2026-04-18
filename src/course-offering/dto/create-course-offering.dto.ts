import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { DayOfWeek } from 'src/common/enums/day-of-week.enum';

export class CreateScheduleDto {
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  /**
   * Optional flag — when true, startTime and endTime must be omitted/null.
   * Defaults to false so existing callers don't need to send it.
   */
  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;

  /**
   * Required only when isOpen is false or not provided.
   * Format: "HH:mm" (24-hour).
   */
  @ValidateIf((o: CreateScheduleDto) => !o.isOpen)
  @IsString()
  @IsNotEmpty()
  startTime?: string;

  @ValidateIf((o: CreateScheduleDto) => !o.isOpen)
  @IsString()
  @IsNotEmpty()
  endTime?: string;

  /**
   * Must be null/absent when isOpen is true.
   * @ValidateIf prevents the string validators from running on null.
   */

  @IsMongoId()
  location: string;
}

export class CreateCourseOfferingDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsMongoId()
  course: string;

  @IsMongoId()
  instructor: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  schedule: CreateScheduleDto[];
}
