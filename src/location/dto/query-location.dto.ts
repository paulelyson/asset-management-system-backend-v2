import { PartialType } from "@nestjs/mapped-types";
import { CreateLocationDto } from "./create-location.dto";

export class QueryLocationDto extends PartialType(CreateLocationDto) {
 page: number;
 limit: number;
 sort: string;
}