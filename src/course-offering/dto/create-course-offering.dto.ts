import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DayOfWeek } from 'src/common/enums/day-of-week.enum';

export class CreateScheduleDto {
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

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