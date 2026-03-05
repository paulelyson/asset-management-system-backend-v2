import { IsMongoId } from 'class-validator';

export class CreateBorrowedEquipmentDto {
  @IsMongoId()
  borrower: string;

  @IsMongoId()
  courseOffering: string;
}
