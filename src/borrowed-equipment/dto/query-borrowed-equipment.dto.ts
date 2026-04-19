import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowedEquipmentDto } from './create-borrowed-equipment.dto';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BorrowedEquipmentStatus } from '../enums/borrowed-equipment.enum';

export class QueryBorrowedEquipmentDto extends PartialType(
  CreateBorrowedEquipmentDto,
) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number = 25;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(BorrowedEquipmentStatus, { each: true })
  @Transform(({ value }) => {
    if (!value) return undefined;
    const arr = Array.isArray(value) ? value : [value];
    const filtered = arr.filter((v) => v !== '');
    return filtered.length ? filtered : undefined;
  })
  status?: BorrowedEquipmentStatus[];
}
