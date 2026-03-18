import { IsArray, IsMongoId, IsNumber, Min } from 'class-validator';

export class CreateEquipmentDto {
  name: string;
  brand: string;
  model: string;
  type: string;
  @IsArray()
  categories: string[];

  @IsNumber()
  @Min(0)
  totalQuantity: number;

  @IsMongoId()
  department: string;
}
