import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from './schemas/equipment.schema';
import { BorrowedEquipmentModule } from 'src/borrowed-equipment/borrowed-equipment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Equipment.name, schema: EquipmentSchema}]),
    BorrowedEquipmentModule
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
