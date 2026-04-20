import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentChangeLogDto } from './create-equipment-change-log.dto';

export class UpdateEquipmentChangeLogDto extends PartialType(CreateEquipmentChangeLogDto) {}
