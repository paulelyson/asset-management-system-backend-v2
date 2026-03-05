import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowedEquipmentDto } from './create-borrowed-equipment.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
}
