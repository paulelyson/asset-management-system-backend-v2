import { Module } from '@nestjs/common';
import { BorrowedEquipmentService } from './borrowed-equipment.service';
import { BorrowedEquipmentController } from './borrowed-equipment.controller';

@Module({
  controllers: [BorrowedEquipmentController],
  providers: [BorrowedEquipmentService],
})
export class BorrowedEquipmentModule {}
