import { IsMongoId, IsNumber, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEquipmentDto {
  @IsNumber()
  @Min(0)
  totalQuantity: number;

  @IsMongoId()
  department: string;
}
