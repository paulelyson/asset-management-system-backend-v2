import { Injectable } from '@nestjs/common';
import { CreateBorrowedEquipmentDto } from './dto/create-borrowed-equipment.dto';
import { UpdateBorrowedEquipmentDto } from './dto/update-borrowed-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BorrowedEquipment, BorrowedEquipmentDocument } from './schemas/borrowed-equipment.schema';
import { Model } from 'mongoose';
import { QueryBorrowedEquipmentDto } from './dto/query-borrowed-equipment.dto';
import { BorrowedEquipmentQueryRepository } from './borrowed-equipment.query.repository';

@Injectable()
export class BorrowedEquipmentService {
  constructor(
    @InjectModel(BorrowedEquipment.name)
    private borrowedEquipmentModel: Model<BorrowedEquipmentDocument>,
    private readonly borrowedEquipmentQueryRepository: BorrowedEquipmentQueryRepository
  ) {}

  create(createBorrowedEquipmentDto: CreateBorrowedEquipmentDto) {
    const borrowedEquipment = new this.borrowedEquipmentModel(createBorrowedEquipmentDto);
    return borrowedEquipment.save();
  }

  findAll() {
    return `This action returns all borrowedEquipment`;
  }

  find(query: QueryBorrowedEquipmentDto) {
    // return this.borrowedEquipmentModel.find().lean().exec();
    return this.borrowedEquipmentQueryRepository.findAllBorrowedEquipmentView({}, query)
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
