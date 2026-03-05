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
        $unwind: {
          path: '$borrowedEquipment',
        },
      },
      {
        $addFields: {
          borrower: { $toObjectId: '$borrower' },
          courseOffering: { $toObjectId: '$courseOffering' },
          'borrowedEquipment.equipment': {
            $toObjectId: '$borrowedEquipment.equipment',
          },
        },
      },
      {
        $lookup: {
          from: 'courseofferings',
          let: { courseOfferId: '$courseOffering' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$courseOfferId'] } } },

            // populate course (only name and code)
            {
              $lookup: {
                from: 'courses',
                let: { courseId: { $toObjectId: '$course' } },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$courseId'] } } },
                  { $project: { name: 1, code: 1 } },
                ],
                as: 'course',
              },
            },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },

            // populate instructor (only firstName, lastName, roles)
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

            // project courseOffering fields you want
            { $project: { code: 1, course: 1, instructor: 1 } },
          ],
          as: 'courseOffering',
        },
      },
      {
        $unwind: { path: '$courseOffering', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'users',
          let: { borrowerId: '$borrower' }, // pass the borrower field
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$borrowerId'] } } },
            { $project: { firstName: 1, lastName: 1, roles: 1 } }, // only these fields
          ],
          as: 'borrower',
        },
      },
      {
        $unwind: '$borrower',
      },
      {
        $lookup: {
          from: 'equipment',
          let: { equipmentId: '$borrowedEquipment.equipment' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$equipmentId'] } } },
            { $project: { name: 1, type: 1, images: 1 } },
          ],
          as: 'equipment',
        },
      },
      {
        $unwind: '$equipment',
      },
      {
        /**
         * look up equipment
         */
        $lookup: {
          from: 'equipment',
          let: { equipmentId: '$borrowedEquipment.equipment' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$equipmentId'] } } },
            { $project: { name: 1, type: 1, images: 1 } },
          ],
          as: 'equipment',
        },
      },
      {
        $unwind: '$equipment',
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

    // const pipeline = [
    //   {
    //     $addFields: {
    //       borrowerz: {
    //         $toObjectId: '$borrower',
    //       },
    //       courseOfferingz: {
    //         $toObjectId: '$courseOffering',
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'borrowerz',
    //       foreignField: '_id',
    //       as: 'borrower',
    //     },
    //   },
    // ];

    const [result]: any[] = await this.model.aggregate(pipeline);
    return result;
  }
}
