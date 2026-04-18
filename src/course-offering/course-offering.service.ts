import { Injectable } from '@nestjs/common';
import { CreateCourseOfferingDto } from './dto/create-course-offering.dto';
import { UpdateCourseOfferingDto } from './dto/update-course-offering.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  CourseOffering,
  CourseOfferingDocument,
} from './schemas/course-offering.schema';
import { Model } from 'mongoose';
import { QueryCourseOfferingDto } from './dto/query-course-offering.dto';

@Injectable()
export class CourseOfferingService {
  constructor(
    @InjectModel(CourseOffering.name)
    private courseOfferingModel: Model<CourseOfferingDocument>,
  ) {}
  create(createCourseOfferingDto: CreateCourseOfferingDto) {
    const courseOffer = new this.courseOfferingModel(createCourseOfferingDto);
    return courseOffer.save();
  }

  findAll() {
    return `This action returns all courseOffering`;
  }

  find(query: QueryCourseOfferingDto) {
    const populate = [
      {
        path: 'course',
        select: 'code title department',
        populate: [{ path: 'department', select: 'code name' }],
      },
      { path: 'instructor', select: 'firstName middleName lastName' },
      { path: 'schedule.location', select: 'name type' },
    ];
    return this.courseOfferingModel
      .find()
      .populate(populate)
      .lean()
      .sort({ code: 1 })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} courseOffering`;
  }

  update(id: number, updateCourseOfferingDto: UpdateCourseOfferingDto) {
    return `This action updates a #${id} courseOffering`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseOffering`;
  }
}
