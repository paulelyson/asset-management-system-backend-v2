import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";

export class QueryCourseDto extends PartialType(CreateCourseDto) {
 page: number;
 limit: number;
 sort: string;
}