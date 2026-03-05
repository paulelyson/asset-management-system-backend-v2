import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BorrowedEquipment,
  BorrowedEquipmentDocument,
} from './schemas/borrowed-equipment.schema';
import { Model, PipelineStage } from 'mongoose';
import { QueryBorrowedEquipmentDto } from './dto/query-borrowed-equipment.dto';

@Injectable()
export class BorrowedEquipmentQueryRepository {
  constructor(
    @InjectModel(BorrowedEquipment.name)
    private readonly model: Model<BorrowedEquipmentDocument>,
  ) {}

  async findAllBorrowedEquipmentView(
    filter: any,
    paginate: QueryBorrowedEquipmentDto,
  ) {
    const skip = (paginate.page - 1) * paginate.limit;
    const pipeline: PipelineStage[] = [
      {
        $match: filter,
      },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
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
      {
        $project: {
          data: 1,
          total: 1,
          page: paginate.page,
          limit: paginate.limit,
          hasNextPage: {
            $gt: ['$total', paginate.page * paginate.limit],
          },
        },
      },
    ];

    const [result]: any[] = await this.model.aggregate(pipeline);
    return result;
  }
}
