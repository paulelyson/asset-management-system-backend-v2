import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentChangeLogService } from './equipment-change-log.service';
import { CreateEquipmentChangeLogDto } from './dto/create-equipment-change-log.dto';
import { UpdateEquipmentChangeLogDto } from './dto/update-equipment-change-log.dto';

@Controller('equipment-change-log')
export class EquipmentChangeLogController {
  constructor(private readonly equipmentChangeLogService: EquipmentChangeLogService) {}

  @Post()
  create(@Body() createEquipmentChangeLogDto: CreateEquipmentChangeLogDto) {
    return this.equipmentChangeLogService.create(createEquipmentChangeLogDto);
  }

  @Get()
  findAll() {
    return this.equipmentChangeLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentChangeLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentChangeLogDto: UpdateEquipmentChangeLogDto) {
    return this.equipmentChangeLogService.update(+id, updateEquipmentChangeLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentChangeLogService.remove(+id);
  }
}
