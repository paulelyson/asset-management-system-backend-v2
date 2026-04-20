import { Injectable } from '@nestjs/common';
import { CreateEquipmentChangeLogDto } from './dto/create-equipment-change-log.dto';
import { UpdateEquipmentChangeLogDto } from './dto/update-equipment-change-log.dto';

@Injectable()
export class EquipmentChangeLogService {
  create(createEquipmentChangeLogDto: CreateEquipmentChangeLogDto) {
    return 'This action adds a new equipmentChangeLog';
  }

  findAll() {
    return `This action returns all equipmentChangeLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentChangeLog`;
  }

  update(id: number, updateEquipmentChangeLogDto: UpdateEquipmentChangeLogDto) {
    return `This action updates a #${id} equipmentChangeLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentChangeLog`;
  }
}
