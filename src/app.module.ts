import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './department/department.module';
import { EquipmentModule } from './equipment/equipment.module';
import { CourseModule } from './course/course.module';
import { TermModule } from './term/term.module';
import { CourseOfferingModule } from './course-offering/course-offering.module';
import { LocationModule } from './location/location.module';
import { BorrowedEquipmentModule } from './borrowed-equipment/borrowed-equipment.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { UsersSeeder } from './database/seeders/user.seeder';
import { Course } from './course/schema/course.schema';
import { CourseOfferingsSeeder } from './database/seeders/course-offerings.seeder';

const DATABASE = process.env.DATABASE || 'mongodb://127.0.0.1:27017/asset_mgt_local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(DATABASE),
    UserModule,
    SchoolModule,
    DepartmentModule,
    EquipmentModule,
    CourseModule,
    TermModule,
    CourseOfferingModule,
    LocationModule,
    BorrowedEquipmentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, UsersSeeder, CourseOfferingsSeeder],
})
export class AppModule {}
