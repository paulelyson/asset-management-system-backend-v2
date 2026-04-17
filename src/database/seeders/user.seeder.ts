import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { User } from 'src/user/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { rawUserGroups } from './data/users.data';
import { parseUserString } from './utils/parse-user.util';

@Injectable()
export class UsersSeeder {
  private readonly logger = new Logger(UsersSeeder.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seed(): Promise<void> {
    this.logger.log('Starting user seeder...');
    let seeded = 0;
    let skipped = 0;
    let failed = 0;

    for (const group of rawUserGroups) {
      const roleEntry = { role: group.role, department: group.department };

      for (const raw of group.users) {
        let dto: CreateUserDto;

        // ── 1. Parse ──────────────────────────────────────────────────────────
        try {
          dto = parseUserString(raw, [roleEntry]);
        } catch (err: any) {
          this.logger.error(`Failed to parse: "${raw}" — ${err.message}`);
          failed++;
          continue;
        }

        // ── 2. Validate via DTO ───────────────────────────────────────────────
        const instance = plainToInstance(CreateUserDto, dto);
        const errors = await validate(instance, { whitelist: true });

        if (errors.length > 0) {
          const messages = errors.flatMap((e) =>
            Object.values(e.constraints ?? {}),
          );
          this.logger.warn(
            `Validation failed for idNumber "${dto.idNumber}": ${messages.join(', ')}`,
          );
          failed++;
          continue;
        }

        // ── 3. Skip duplicates ────────────────────────────────────────────────
        const exists = await this.userModel.exists({ idNumber: dto.idNumber });
        if (exists) {
          this.logger.verbose(`Skipping existing user: ${dto.idNumber}`);
          skipped++;
          continue;
        }

        // ── 4. Save ───────────────────────────────────────────────────────────
        await this.userModel.create(dto);
        this.logger.log(
          `Seeded: ${dto.firstName} ${dto.lastName} (${dto.idNumber})`,
        );
        seeded++;
      }
    }

    this.logger.log(
      `Seeder done — seeded: ${seeded}, skipped: ${skipped}, failed: ${failed}`,
    );
  }
}
