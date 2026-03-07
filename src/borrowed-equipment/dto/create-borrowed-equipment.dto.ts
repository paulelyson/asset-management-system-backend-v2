import { IsArray, IsMongoId, ValidateNested } from 'class-validator';
import { TransactionDto } from './transaction.dto';
import { Type } from 'class-transformer';

export class CreateBorrowedEquipmentDto {
  @IsMongoId()
  borrower: string;

  @IsMongoId()
  courseOffering: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionDto)
  transaction: TransactionDto[];
}
