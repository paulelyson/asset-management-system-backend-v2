import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectModel } from '@nestjs/mongoose';
import { School, SchoolDocument } from './schemas/school.schema';
import { Model } from 'mongoose';
import { QuerySchoolDto } from './dto/query-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
  ) {}
  
  create(createSchoolDto: CreateSchoolDto) {
    const school = new this.schoolModel(createSchoolDto);
    return school.save();
  }

  findAll() {
    return `This action returns all school`;
  }

  find(query: QuerySchoolDto) {
    return this.schoolModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
