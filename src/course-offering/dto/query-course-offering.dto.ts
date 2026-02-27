import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseOfferingDto } from "./create-course-offering.dto";

export class QueryCourseOfferingDto extends PartialType(CreateCourseOfferingDto) {
 page: number;
 limit: number;
 sort: string;
}