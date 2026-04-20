import { Module } from '@nestjs/common';
import { EquipmentChangeLogService } from './equipment-change-log.service';
import { EquipmentChangeLogController } from './equipment-change-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentChangeLog, EquipmentChangeLogSchema } from './schemas/equipment-change-log.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: EquipmentChangeLog.name, schema: EquipmentChangeLogSchema }]),
    ],
  controllers: [EquipmentChangeLogController],
  providers: [EquipmentChangeLogService],
  exports: [MongooseModule]
})
export class EquipmentChangeLogModule {}
