import { Model, PipelineStage, Query } from 'mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { QueryEquipmentDto } from './dto/query-equipment.dto';

@Injectable()
export class EquipmentRepository {
  constructor(
    @InjectModel(Equipment.name)
    private readonly model: Model<EquipmentDocument>,
  ) {}

  async findAll(filter: any, paginate: QueryEquipmentDto) {
    const skip = (paginate.page - 1) * paginate.limit;

    const pipeline: PipelineStage[] = [
      { $match: filter },
      // attach the latest borrowedEquipment item for this equipment (if any)
      {
        $lookup: {
          from: 'borrowedequipments',
          let: {
            equipmentId: { $toString: '$_id' },
          },
          pipeline: [
            {
              $unwind: '$borrowedEquipment',
            },
            {
              $match: {
                $expr: {
                  $eq: [
                    '$borrowedEquipment.equipment',
                    '$$equipmentId',
                  ] /* replace with $$equipmentId when testing */,
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            {
              $project: {
                transactions: '$borrowedEquipment.transactions',
              },
            },
          ],
          as: 'latestBorrow',
        },
      },
      { $unwind: { path: '$latestBorrow', preserveNullAndEmptyArrays: true } },
      { $addFields: { transactions: '$latestBorrow.transactions' } },
      { $unset: 'latestBorrow' },
      {
        $facet: {
          data: [
            // { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: paginate.limit },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
      {
        $addFields: {
          total: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] },
        },
      },
      { $project: { data: 1, total: 1 } },
    ];

    const [result]: any[] = (await this.model.aggregate(pipeline).exec()) || [
      { data: [], total: 0 },
    ];
    return result;
  }
}
