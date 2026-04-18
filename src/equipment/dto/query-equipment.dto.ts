import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipmentDto } from "./create-equipment.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class QueryEquipmentDto extends PartialType(CreateEquipmentDto) {
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

   @IsOptional()
   search?: string;

   @IsOptional()
   department?: string;
}