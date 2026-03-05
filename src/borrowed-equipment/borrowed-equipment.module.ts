import { Module } from '@nestjs/common';
import { BorrowedEquipmentService } from './borrowed-equipment.service';
import { BorrowedEquipmentController } from './borrowed-equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowedEquipment, BorrowedEquipmentSchema } from './schemas/borrowed-equipment.schema';
import { BorrowedEquipmentItemSchema } from './schemas/borrowed-equipment-item.schema';
import { BorrowedEquipmentQueryRepository } from './borrowed-equipment.query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: BorrowedEquipment.name, schema: BorrowedEquipmentSchema}])
  ],
  controllers: [BorrowedEquipmentController],
  providers: [BorrowedEquipmentService, BorrowedEquipmentQueryRepository],
})
export class BorrowedEquipmentModule {}
