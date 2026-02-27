import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowedEquipmentService } from './borrowed-equipment.service';
import { CreateBorrowedEquipmentDto } from './dto/create-borrowed-equipment.dto';
import { UpdateBorrowedEquipmentDto } from './dto/update-borrowed-equipment.dto';

@Controller('borrowed-equipment')
export class BorrowedEquipmentController {
  constructor(private readonly borrowedEquipmentService: BorrowedEquipmentService) {}

  @Post()
  create(@Body() createBorrowedEquipmentDto: CreateBorrowedEquipmentDto) {
    return this.borrowedEquipmentService.create(createBorrowedEquipmentDto);
  }

  @Get()
  findAll() {
    return this.borrowedEquipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowedEquipmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowedEquipmentDto: UpdateBorrowedEquipmentDto) {
    return this.borrowedEquipmentService.update(+id, updateBorrowedEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowedEquipmentService.remove(+id);
  }
}
