import { Injectable } from '@nestjs/common';
import { CreateCourseOfferingDto } from './dto/create-course-offering.dto';
import { UpdateCourseOfferingDto } from './dto/update-course-offering.dto';

@Injectable()
export class CourseOfferingService {
  create(createCourseOfferingDto: CreateCourseOfferingDto) {
    return 'This action adds a new courseOffering';
  }

  findAll() {
    return `This action returns all courseOffering`;
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
