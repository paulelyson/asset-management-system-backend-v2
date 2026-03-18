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
    const { page, limit, department, search, categories, brand, type } = query;
    const filter = {
      ...(department && { department }),
      ...(search && { name: { $regex: search, $options: 'i' } }),
      ...(categories && { categories: { $in: categories } }),
      ...(brand && { brand }),
      ...(type && { type }),
    };
    
    const equipments =  this.departmentModel
    .find(filter)
    .skip(limit * (page - 1))
    .limit(limit)
    .lean()
    .exec();

    const total = this.departmentModel.countDocuments().exec();
    return Promise.all([equipments, total]).then(([data, total]) => ({
      data,
      total,
      page,
      limit,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  getStatus(equipmentId: string) {
    return `This action returns a #${equipmentId} status`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
