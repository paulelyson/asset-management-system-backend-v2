import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsInt,
  IsMongoId,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { TransactionDto } from './transaction.dto';
import { Type } from 'class-transformer';

export class DateOfUseDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}

export class BorrowedEquipmentItemDto {
  @IsMongoId()
  equipment: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @ValidateNested({ each: true })
  @Type(() => TransactionDto)
  @ArrayMinSize(1)
  transactions: TransactionDto[];
}

export class CreateBorrowedEquipmentDto {
  @IsMongoId()
  borrower: string;

  @IsString()
  purpose: string;

  @IsMongoId()
  courseOffering: string;

  @ValidateNested()
  @Type(() => DateOfUseDto)
  dateOfUse: DateOfUseDto;

  @ValidateNested({ each: true })
  @Type(() => BorrowedEquipmentItemDto)
  @ArrayMinSize(1) // 👈 ensures at least 1 item
  borrowedEquipment: BorrowedEquipmentItemDto[];
}
