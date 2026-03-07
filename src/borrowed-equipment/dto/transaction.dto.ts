import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { EquipmentCondition } from "src/equipment/enums/equipment.enum";
import { BorrowedEquipmentStatus } from "../enums/borrowed-equipment.enum";

export class TransactionDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsEnum(EquipmentCondition)
  condition: EquipmentCondition;

  @IsEnum(BorrowedEquipmentStatus)
  status: BorrowedEquipmentStatus;

  @IsOptional()
  @IsString()
  remarks?: string;
}