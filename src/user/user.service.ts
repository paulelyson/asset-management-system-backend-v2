import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  find(query: QueryUserDto) {
    return this.userModel.find().lean().exec();
  }

  findOne(username: string) {
    return this.userModel
      .findOne({ idNumber: username })
      .select('+password')
      .populate('roles.department', 'code name')
      .lean()
      .exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  updatePassword(username: string, password: string) {
    return this.userModel.findOneAndUpdate({ idNumber: username }, { password: password }).exec();
  }
}
