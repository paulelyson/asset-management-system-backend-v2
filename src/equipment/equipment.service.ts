import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { QueryEquipmentDto } from './dto/query-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private departmentModel: Model<EquipmentDocument>,
  ) {}
  create(createEquipmentDto: CreateEquipmentDto) {
    const equipment = new this.departmentModel(createEquipmentDto);
    return equipment.save();
  }

  findAll() {
    return `This action returns all equipment`;
  }

  find(query: QueryEquipmentDto) {
    return this.departmentModel.find().lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
