import { PartialType } from "@nestjs/mapped-types";
import { CreateDepartmentDto } from "./create-department.dto";

export class QueryDepartmentDto extends PartialType(CreateDepartmentDto) {
 page: number;
 limit: number;
 sort: string;
}