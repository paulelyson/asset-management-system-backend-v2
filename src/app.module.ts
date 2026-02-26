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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
