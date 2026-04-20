import { Module } from '@nestjs/common';
import { EquipmentChangeLogService } from './equipment-change-log.service';
import { EquipmentChangeLogController } from './equipment-change-log.controller';

@Module({
  controllers: [EquipmentChangeLogController],
  providers: [EquipmentChangeLogService],
})
export class EquipmentChangeLogModule {}
