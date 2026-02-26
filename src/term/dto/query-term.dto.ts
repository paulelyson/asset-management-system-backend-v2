import { PartialType } from "@nestjs/mapped-types";
import { CreateTermDto } from "./create-term.dto";

export class QueryTermDto extends PartialType(CreateTermDto) {
 page: number;
 limit: number;
 sort: string;
}