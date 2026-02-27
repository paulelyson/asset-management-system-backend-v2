import { Module } from '@nestjs/common';
import { CourseOfferingService } from './course-offering.service';
import { CourseOfferingController } from './course-offering.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseOffering, CourseOfferingSchema } from './schemas/course-offering.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CourseOffering.name, schema: CourseOfferingSchema}])
  ],
  controllers: [CourseOfferingController],
  providers: [CourseOfferingService],
})
export class CourseOfferingModule {}
