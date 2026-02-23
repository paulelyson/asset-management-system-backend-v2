import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolDto } from './create-school.dto';

export class QuerySchoolDto extends PartialType(CreateSchoolDto) {
 page: number;
 limit: number;
 sort: string;
}