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
      { $unwind: { path: '$borrowedEquipment' } },
      { $match: filter },
      {
        $addFields: {
          trackId: '$borrowedEquipment._id',
          borrower: { $toObjectId: '$borrower' },
          courseOffering: { $toObjectId: '$courseOffering' },
          equipment: { $toObjectId: '$borrowedEquipment.equipment' },
          quantity: '$borrowedEquipment.quantity',
          transactions: '$borrowedEquipment.transactions',
        },
      },
      { $unset: 'borrowedEquipment' },

      // ✅ 1. Collect all updatedBy IDs from the transactions array in one lookup
      {
        $lookup: {
          from: 'users',
          let: {
            updatedByIds: {
              $map: {
                input: '$transactions',
                as: 't',
                in: { $toObjectId: '$$t.updatedBy' },
              },
            },
          },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$updatedByIds'] } } },
            { $project: { firstName: 1, lastName: 1, roles: 1 } },
          ],
          as: '_updatedByUsers',
        },
      },

      // ✅ 2. Map over transactions and replace updatedBy string with the populated user object
      {
        $addFields: {
          transactions: {
            $map: {
              input: '$transactions',
              as: 't',
              in: {
                $mergeObjects: [
                  '$$t',
                  {
                    updatedBy: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$_updatedByUsers',
                            as: 'u',
                            cond: {
                              $eq: [
                                '$$u._id',
                                { $toObjectId: '$$t.updatedBy' },
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },

      // ✅ 3. Clean up the temp array
      { $unset: '_updatedByUsers' },

      // --- rest of your pipeline unchanged ---
      {
        $lookup: {
          from: 'equipment',
          let: { equipmentId: '$equipment' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$equipmentId'] } } },
            { $project: { name: 1, type: 1, images: 1 } },
          ],
          as: 'equipment',
        },
      },
      { $unwind: '$equipment' },
      {
        $lookup: {
          from: 'users',
          let: { borrowerId: '$borrower' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$borrowerId'] } } },
            { $project: { firstName: 1, lastName: 1, roles: 1 } },
          ],
          as: 'borrower',
        },
      },
      { $unwind: '$borrower' },
      {
        $lookup: {
          from: 'courseofferings',
          let: { courseOfferId: '$courseOffering' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$courseOfferId'] } } },
            {
              $lookup: {
                from: 'courses',
                let: { courseId: { $toObjectId: '$course' } },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$courseId'] } } },
                  {
                    $lookup: {
                      from: 'departments',
                      let: { departmentId: { $toObjectId: '$department' } },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$_id', '$$departmentId'] },
                          },
                        },
                        { $project: { name: 1 } },
                      ],
                      as: 'department',
                    },
                  },
                  {
                    $unwind: {
                      path: '$department',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  { $project: { name: 1, code: 1, department: 1 } },
                ],
                as: 'course',
              },
            },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users',
                let: { instructorId: { $toObjectId: '$instructor' } },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$instructorId'] } } },
                  { $project: { firstName: 1, lastName: 1, roles: 1 } },
                ],
                as: 'instructor',
              },
            },
            {
              $unwind: {
                path: '$instructor',
                preserveNullAndEmptyArrays: true,
              },
            },
            { $project: { code: 1, course: 1, instructor: 1 } },
          ],
          as: 'courseOffering',
        },
      },
      {
        $unwind: { path: '$courseOffering', preserveNullAndEmptyArrays: true },
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
          hasNextPage: { $gt: ['$total', paginate.page * paginate.limit] },
        },
      },
    ];

    const [result]: any[] = await this.model.aggregate(pipeline);
    return result;
  }
}
