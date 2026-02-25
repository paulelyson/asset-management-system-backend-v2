import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipmentDto } from "./create-equipment.dto";

export class QueryEquipmentDto extends PartialType(CreateEquipmentDto) {
 page: number;
 limit: number;
 sort: string;
}