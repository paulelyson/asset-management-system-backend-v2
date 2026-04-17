import { Injectable } from '@nestjs/common';
import { CreateBorrowedEquipmentDto } from './dto/create-borrowed-equipment.dto';
import { UpdateBorrowedEquipmentDto } from './dto/update-borrowed-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  BorrowedEquipment,
  BorrowedEquipmentDocument,
} from './schemas/borrowed-equipment.schema';
import { Model } from 'mongoose';
import { QueryBorrowedEquipmentDto } from './dto/query-borrowed-equipment.dto';
import { BorrowedEquipmentQueryRepository } from './borrowed-equipment.query.repository';
import { TransactionDto } from './dto/transaction.dto';
import { getAccumulatedStatus } from 'src/common/utils/transaction.util';
import { hasRole } from 'src/common/utils/user.util';
import { UserRole } from 'src/user/enums/role.enum';

@Injectable()
export class BorrowedEquipmentService {
  constructor(
    @InjectModel(BorrowedEquipment.name)
    private borrowedEquipmentModel: Model<BorrowedEquipmentDocument>,
    private readonly borrowedEquipmentQueryRepository: BorrowedEquipmentQueryRepository,
  ) {}

  create(createBorrowedEquipmentDto: CreateBorrowedEquipmentDto) {
    const borrowedEquipment = new this.borrowedEquipmentModel(
      createBorrowedEquipmentDto,
    );
    return borrowedEquipment.save();
  }

  findAll() {
    return `This action returns all borrowedEquipment`;
  }

  find(query: QueryBorrowedEquipmentDto, req: any) {
    const userId = req.user._id;
    const filter: any = {
      $or: [{ borrower: userId }, { instructor: userId }],
    };
    const dept = req.user.roles[0].department;
    const role = UserRole.CHAIRMAN;
    const userHasRole = hasRole(role, dept, req.user.roles);
    if (userHasRole) {
      filter.$or.push({ department: userId });
    }
    
    return this.borrowedEquipmentQueryRepository
      .findAllBorrowedEquipmentView(filter, query)
      .then((resp) => {
        let borrowedEquipment: any[] = resp?.data ?? [];
        borrowedEquipment = borrowedEquipment.map((eqpmnt) => ({
          ...eqpmnt,
          accumulatedStatus: getAccumulatedStatus(eqpmnt.transactions),
        }));

        resp.data = borrowedEquipment;
        return resp;
      });
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

  addTransaction(id: string, equipmentId: string, dto: TransactionDto) {
    return this.borrowedEquipmentModel.findOneAndUpdate(
      { _id: id, 'borrowedEquipment.equipment': equipmentId },
      { $push: { 'borrowedEquipment.$.transactions': dto } },
      { returnDocument: 'after' },
    );
  }
}
