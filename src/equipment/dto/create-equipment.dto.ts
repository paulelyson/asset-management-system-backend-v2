import { IsMongoId, IsNumber, Min } from 'class-validator';

export class CreateEquipmentDto {
  @IsNumber()
  @Min(0)
  totalQuantity: number;

  @IsMongoId()
  department: string;
}
