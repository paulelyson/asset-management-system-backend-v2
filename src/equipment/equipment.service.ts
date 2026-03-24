import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { QueryEquipmentDto } from './dto/query-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { get, Model } from 'mongoose';
import { getAccumulatedStatus } from 'src/common/utils/transaction.util';
import { BorrowedEquipmentQueryRepository } from 'src/borrowed-equipment/borrowed-equipment.query.repository';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private equipmentModel: Model<EquipmentDocument>,
    private readonly borrowedEquipmentQueryRepository: BorrowedEquipmentQueryRepository
    
  ) {}
  create(createEquipmentDto: CreateEquipmentDto) {
    const equipment = new this.equipmentModel(createEquipmentDto);
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
    
    const equipments =  this.equipmentModel
    .find(filter)
    .skip(limit * (page - 1))
    .limit(limit)
    .lean()
    .exec();

    const total = this.equipmentModel.countDocuments().exec();
    return Promise.all([equipments, total]).then(([data, total]) => ({
      data,
      total,
      page,
      limit,
      hasNextPage: page * limit < total,
    }));
  }

  findOne(id: string) {
    return this.equipmentModel.findById(id).exec();
  }

  getStatus(id: string) {
    const filter = { "borrowedEquipment.equipment": id };
    const paginate = { page: 1, limit: 100 };

    const accumulatedStatus = this.borrowedEquipmentQueryRepository
    .findAllBorrowedEquipmentView(filter, paginate)
    .then(resp=> resp.data[0] ?? null)
    .then(equipment=> {
      if(!equipment) return [];
      const accumulatedStatus = getAccumulatedStatus(equipment.transactions);
      return accumulatedStatus;
    })
    return accumulatedStatus;
  }

  update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: string) {
    return `This action removes a #${id} equipment`;
  }
}
