// dto/create-equipment.dto.ts
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsDate,
  IsMongoId,
  Min,
  ValidateNested,
  ArrayMinSize,
  IsNotEmpty,
  IsUrl,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Matter } from '../enums/equipment.enum';
import { EquipmentTag } from '../enums/equipment.enum';
import { EquipmentCondition } from '../enums/equipment.enum';

export class EquipmentImageDto {
  @IsUrl()
  thumbnail: string;

  @IsUrl()
  midsize: string;

  @IsUrl()
  original: string;
}

export class ConditionAndQuantityDto {
  @IsEnum(EquipmentCondition)
  condition: EquipmentCondition;

  @IsInt()
  @Min(0)
  quantity: number;
}

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  serialNo: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  modelNo?: string;

  @IsNumber()
  @Min(0)
  totalQuantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1) // at least 1 condition entry makes sense
  @Type(() => ConditionAndQuantityDto)
  conditionAndQuantity: ConditionAndQuantityDto[];

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsEnum(Matter)
  @IsOptional()
  matter?: Matter;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateAcquired?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipmentImageDto)
  @IsOptional()
  images?: EquipmentImageDto[];

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsBoolean()
  @IsOptional()
  hasTag?: boolean;

  @IsMongoId()
  @IsOptional()
  checkedBy?: string;

  @IsMongoId()
  department: string; // required — no @IsOptional

  @IsEnum(EquipmentTag)
  @IsOptional()
  tag?: EquipmentTag;

  @IsMongoId()
  @IsOptional()
  location?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  warrantyPeriod?: Date;
}
