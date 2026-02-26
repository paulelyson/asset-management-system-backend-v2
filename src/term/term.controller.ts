import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TermService } from './term.service';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { QueryTermDto } from './dto/query-term.dto';

@Controller('term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  create(@Body() createTermDto: CreateTermDto) {
    return this.termService.create(createTermDto);
  }

  @Get()
  find(@Query() query: QueryTermDto) {
    return this.termService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermDto: UpdateTermDto) {
    return this.termService.update(+id, updateTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termService.remove(+id);
  }
}
