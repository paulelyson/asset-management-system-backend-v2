import { Injectable } from '@nestjs/common';
import { CreateBorrowedEquipmentDto } from './dto/create-borrowed-equipment.dto';
import { UpdateBorrowedEquipmentDto } from './dto/update-borrowed-equipment.dto';

@Injectable()
export class BorrowedEquipmentService {
  create(createBorrowedEquipmentDto: CreateBorrowedEquipmentDto) {
    return 'This action adds a new borrowedEquipment';
  }

  findAll() {
    return `This action returns all borrowedEquipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowedEquipment`;
  }

  update(id: number, updateBorrowedEquipmentDto: UpdateBorrowedEquipmentDto) {
    return `This action updates a #${id} borrowedEquipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowedEquipment`;
  }
}
