import { Injectable } from '@nestjs/common';
import { CreateBorrowedEquipmentDto } from './dto/create-borrowed-equipment.dto';
import { UpdateBorrowedEquipmentDto } from './dto/update-borrowed-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BorrowedEquipment, BorrowedEquipmentDocument } from './schemas/borrowed-equipment.schema';
import { Model } from 'mongoose';
import { QueryBorrowedEquipmentDto } from './dto/query-borrowed-equipment.dto';
import { BorrowedEquipmentQueryRepository } from './borrowed-equipment.query.repository';
import { Transaction } from './schemas/transaction.schema';
import { BorrowedEquipmentStatus, STATUS_FLOW } from './enums/borrowed-equipment.enum';
import { TransactionDto } from './dto/transaction.dto';

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
   return this.borrowedEquipmentQueryRepository
     .findAllBorrowedEquipmentView({}, query)
     .then(resp=> {
      let borrowedEquipment :any[] = resp?.data ?? [];
      borrowedEquipment = borrowedEquipment.map(eqpmnt=> ({
        ...eqpmnt,
        accumulatedStatus: this.getAccumulatedStatus(eqpmnt.transactions)
      }))

      resp.data = borrowedEquipment;
      return resp;
     })

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
    { _id: id, "borrowedEquipment.equipment": equipmentId,},
    { $push: { "borrowedEquipment.$.transactions": dto } },
    { new: true },
  );
  }

  private getAccumulatedStatus(transactions: Transaction[]){
    let accumulated: Pick<Transaction, "status" | "quantity">[]= [];
    const reached = new Map<BorrowedEquipmentStatus, number>();
    for (const tx of transactions) {
      reached.set(tx.status, Math.max(reached.get(tx.status) ?? 0, tx.quantity));
    }
    // 2️⃣ subtract the NEXT EXISTING downstream status
    for (let i = 0; i < STATUS_FLOW.length; i++) {
      const status = STATUS_FLOW[i];
      const currentReached = reached.get(status);
      if (!currentReached) continue;

      let nextReached = 0;

      // 🔑 find the nearest downstream status that exists
      for (let j = i + 1; j < STATUS_FLOW.length; j++) {
        const candidate = reached.get(STATUS_FLOW[j]);
        if (candidate !== undefined) {
          nextReached = candidate;
          break;
        }
      }

      const quantity = currentReached - nextReached;

      if (quantity > 0) {
        accumulated.push({ status, quantity });
      }
    }
    return accumulated.filter((x) => x.quantity > 0);
  }
}
