import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowedEquipmentDto } from './create-borrowed-equipment.dto';

export class UpdateBorrowedEquipmentDto extends PartialType(CreateBorrowedEquipmentDto) {}
