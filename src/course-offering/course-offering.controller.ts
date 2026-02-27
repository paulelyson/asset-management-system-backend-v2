import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CourseOfferingService } from './course-offering.service';
import { CreateCourseOfferingDto } from './dto/create-course-offering.dto';
import { UpdateCourseOfferingDto } from './dto/update-course-offering.dto';
import { QueryCourseOfferingDto } from './dto/query-course-offering.dto';

@Controller('course-offering')
export class CourseOfferingController {
  constructor(private readonly courseOfferingService: CourseOfferingService) {}

  @Post()
  create(@Body() createCourseOfferingDto: CreateCourseOfferingDto) {
    return this.courseOfferingService.create(createCourseOfferingDto);
  }

  @Get()
  find(@Query() query: QueryCourseOfferingDto) {
    return this.courseOfferingService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseOfferingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseOfferingDto: UpdateCourseOfferingDto) {
    return this.courseOfferingService.update(+id, updateCourseOfferingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseOfferingService.remove(+id);
  }
}
