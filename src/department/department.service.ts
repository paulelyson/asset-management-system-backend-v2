import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { Model } from 'mongoose';
import { QueryDepartmentDto } from './dto/query-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const department = new this.departmentModel(createDepartmentDto);
    return department.save();
  }

  findAll() {
    return `This action returns all department`;
  }

  find(query: QueryDepartmentDto) {
     let populate = [{ path: 'school', select: 'code name' }];
    return this.departmentModel.find().populate(populate).lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
