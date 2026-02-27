import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { Model } from 'mongoose';
import { QueryLocationDto } from './dto/query-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const location = new this.locationModel(createLocationDto);
    return location.save();
  }

  findAll() {
    return `This action returns all location`;
  }

  find(query: QueryLocationDto) {
    return this.locationModel.find().lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
