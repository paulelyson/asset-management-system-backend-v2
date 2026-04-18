import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CourseOffering } from 'src/course-offering/schemas/course-offering.schema';
import { Course } from 'src/course/schema/course.schema';
import { User } from 'src/user/schemas/user.schema';
import { Location } from 'src/location/schemas/location.schema';


import { COURSE_OFFERINGS_DATA } from './data/course-offering.data';
import {
  parseCourseOffering,
  ResolutionMaps,
} from './utils/parse-course-offering.util';

@Injectable()
export class CourseOfferingsSeeder {
  private readonly logger = new Logger(CourseOfferingsSeeder.name);

  constructor(
    @InjectModel(CourseOffering.name)
    private readonly courseOfferingModel: Model<CourseOffering>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
  ) {}

  async seed(): Promise<void> {
    this.logger.log('Starting CourseOffering seeder...');

    // ── 1. Build resolution maps ────────────────────────────────────────────
    const maps = await this.buildResolutionMaps();

    this.logger.log(
      `Loaded ${maps.courseMap.size} courses, ` +
      `${maps.userMap.size} users, ` +
      `${maps.locationMap.size} locations.`,
    );

    // ── 2. Resolve raw data → ObjectId documents ────────────────────────────
    const resolved = COURSE_OFFERINGS_DATA.map((raw) =>
      parseCourseOffering(raw, maps),
    );

    // ── 3. Upsert — safe to re-run without duplicating ──────────────────────
    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const doc of resolved) {
      try {
        const result = await this.courseOfferingModel.updateOne(
          { code: doc.code },
          { $setOnInsert: doc },
          { upsert: true },
        );

        if (result.upsertedCount > 0) {
          inserted++;
        } else {
          skipped++;
          this.logger.debug(`Skipped (already exists): ${doc.code}`);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(`[${doc.code}] ${message}`);
        this.logger.error(`Failed to seed offering ${doc.code}: ${message}`);
      }
    }

    // ── 4. Summary ──────────────────────────────────────────────────────────
    this.logger.log(
      `CourseOffering seeder complete — ` +
      `inserted: ${inserted}, skipped: ${skipped}, errors: ${errors.length}.`,
    );

    if (errors.length > 0) {
      this.logger.warn('The following offerings failed to seed:');
      errors.forEach((e) => this.logger.warn(`  ${e}`));
    }
  }

  // ── Resolution map builders ──────────────────────────────────────────────

  private async buildResolutionMaps(): Promise<ResolutionMaps> {
    const [courses, users, locations] = await Promise.all([
      this.courseModel.find({}, { _id: 1, code: 1 }).lean(),
      this.userModel.find({}, { _id: 1, idNumber: 1 }).lean(),
      this.locationModel.find({}, { _id: 1, name: 1 }).lean(),
    ]);

    const courseMap = new Map<string, Types.ObjectId>(
      courses.map((c) => [c.code, c._id as Types.ObjectId]),
    );

    const userMap = new Map<string, Types.ObjectId>(
      users.map((u) => [u.idNumber, u._id as Types.ObjectId]),
    );

    const locationMap = new Map<string, Types.ObjectId>(
      locations.map((l) => [l.name, l._id as Types.ObjectId]),
    );

    return { courseMap, userMap, locationMap };
  }
}