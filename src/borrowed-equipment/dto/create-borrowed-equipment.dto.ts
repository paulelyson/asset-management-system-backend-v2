import { IsArray, IsMongoId, ValidateNested } from 'class-validator';
import { TransactionDto } from './transaction.dto';
import { Type } from 'class-transformer';

export class CreateBorrowedEquipmentDto {
  @IsMongoId()
  borrower: string;

  @IsMongoId()
  courseOffering: string;

  // TODO
  // validation for Borrowed Equipment Transaction esp on updatedBy field
}
