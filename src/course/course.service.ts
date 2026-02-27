import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schema/course.schema';
import { Model } from 'mongoose';
import { QueryCourseDto } from './dto/query-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  findAll() {
    return `This action returns all course`;
  }

  find(query: QueryCourseDto) {
    return this.courseModel.find().lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
