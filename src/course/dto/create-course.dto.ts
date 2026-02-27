import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class CreateCourseDto {
 @IsMongoId()
 department: string;
}
