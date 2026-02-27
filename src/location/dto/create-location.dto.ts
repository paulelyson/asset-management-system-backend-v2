import { IsMongoId, IsOptional } from "class-validator";

export class CreateLocationDto {
 @IsMongoId()
 @IsOptional()
 department?: string;
}
