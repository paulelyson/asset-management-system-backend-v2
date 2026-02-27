import { Module } from '@nestjs/common';
import { CourseOfferingService } from './course-offering.service';
import { CourseOfferingController } from './course-offering.controller';

@Module({
  controllers: [CourseOfferingController],
  providers: [CourseOfferingService],
})
export class CourseOfferingModule {}
