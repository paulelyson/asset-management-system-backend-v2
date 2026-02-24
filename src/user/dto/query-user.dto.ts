import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class QueryUserDto extends PartialType(CreateUserDto) {
 page: number;
 limit: number;
 sort: string;
}