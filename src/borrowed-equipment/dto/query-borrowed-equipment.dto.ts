import { PartialType } from "@nestjs/mapped-types";
import { CreateBorrowedEquipmentDto } from "./create-borrowed-equipment.dto";

export class QueryBorrowedEquipmentDto extends PartialType(CreateBorrowedEquipmentDto) {
 page: number;
 limit: number;
 sort: string;
}