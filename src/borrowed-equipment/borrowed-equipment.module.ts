import { Module } from '@nestjs/common';
import { BorrowedEquipmentService } from './borrowed-equipment.service';
import { BorrowedEquipmentController } from './borrowed-equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowedEquipment, BorrowedEquipmentSchema } from './schemas/borrowed-equipment.schema';
import { BorrowedEquipmentItemSchema } from './schemas/borrowed-equipment-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: BorrowedEquipment.name, schema: BorrowedEquipmentSchema}])
  ],
  controllers: [BorrowedEquipmentController],
  providers: [BorrowedEquipmentService],
})
export class BorrowedEquipmentModule {}
