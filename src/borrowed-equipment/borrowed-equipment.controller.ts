import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { BorrowedEquipmentService } from './borrowed-equipment.service';
import { CreateBorrowedEquipmentDto } from './dto/create-borrowed-equipment.dto';
import { UpdateBorrowedEquipmentDto } from './dto/update-borrowed-equipment.dto';
import { QueryBorrowedEquipmentDto } from './dto/query-borrowed-equipment.dto';
import { TransactionUpdateGuard } from './borrowed-equipment.guard';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('borrowed-equipment')
export class BorrowedEquipmentController {
  constructor(private readonly borrowedEquipmentService: BorrowedEquipmentService) {}

  @Post()
  create(@Body() createBorrowedEquipmentDto: CreateBorrowedEquipmentDto) {
    return this.borrowedEquipmentService.create(createBorrowedEquipmentDto);
  }

  @Get()
  find(@Query() query: QueryBorrowedEquipmentDto) {
    return this.borrowedEquipmentService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowedEquipmentService.findOne(+id);
  }

  @UseGuards(TransactionUpdateGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowedEquipmentDto: UpdateBorrowedEquipmentDto) {
    return this.borrowedEquipmentService.update(+id, updateBorrowedEquipmentDto);
  }

  @Patch(':borrowId/equipment/:equipmentId/transactions')
  addTransaction(
    @Param('borrowId') borrowId: string,
    @Param('equipmentId') equipmentId: string,
    @Body() transaction: TransactionDto,
    @Req() req: any,
  ) {
    transaction.updatedBy = req.user._id;
    return this.borrowedEquipmentService.addTransaction(borrowId, equipmentId, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowedEquipmentService.remove(+id);
  }
}
