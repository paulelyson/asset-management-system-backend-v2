import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { QueryEquipmentDto } from './dto/query-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { Model, Types, PipelineStage } from 'mongoose';
import { getAccumulatedStatus } from 'src/common/utils/transaction.util';
import { BorrowedEquipmentQueryRepository } from 'src/borrowed-equipment/borrowed-equipment.query.repository';
import { EquipmentRepository } from './equipment.repository';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private equipmentModel: Model<EquipmentDocument>,
    private readonly borrowedEquipmentQueryRepository: BorrowedEquipmentQueryRepository,
    private readonly equipmentRepository: EquipmentRepository,
  ) {}
  create(createEquipmentDto: CreateEquipmentDto) {
    const equipment = new this.equipmentModel(createEquipmentDto);
    return equipment.save();
  }

  findAll() {
    return `This action returns all equipment`;
  }

  async find(query: QueryEquipmentDto) {
    const { page, limit, department, search, categories, brand, type } = query;

    // build match filter (coerce department to ObjectId for aggregation)
    const match: any = {
      ...(department && { department }),
      ...(search && { name: { $regex: search, $options: 'i' } }),
      ...(categories && { categories: { $in: categories } }),
      ...(brand && { brand }),
      ...(type && { type }),
    };

    const result = await this.equipmentRepository.findAll(match, query);
    const data = (result.data || []).map((equipment: any) => {
      const mapped = {
        ...equipment,
        accumulatedStatus: getAccumulatedStatus(equipment.transactions || []),
      };
      delete mapped.transactions;
      return mapped;
    });

    return {
      data,
      total: result.total || 0,
      page,
      limit,
      hasNextPage: page * limit < (result.total || 0),
    };
  }

  findOne(id: string) {
    return this.equipmentModel.findById(id).exec();
  }

  getStatus(id: string) {
    const filter = { 'borrowedEquipment.equipment': id };
    const paginate = { page: 1, limit: 100 };

    const accumulatedStatus = this.borrowedEquipmentQueryRepository
      .findAllBorrowedEquipmentView(filter, paginate)
      .then((resp) => resp.data[0] ?? null)
      .then((equipment) => {
        if (!equipment) return [];
        const accumulatedStatus = getAccumulatedStatus(equipment.transactions);
        return accumulatedStatus;
      });
    return accumulatedStatus;
  }

  update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: string) {
    return `This action removes a #${id} equipment`;
  }
}
