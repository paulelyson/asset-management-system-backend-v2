import { Injectable } from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Term, TermDocument } from './schemas/term.schema';
import { Model } from 'mongoose';
import { QueryTermDto } from './dto/query-term.dto';

@Injectable()
export class TermService {
  constructor(
    @InjectModel(Term.name)
    private termModel: Model<TermDocument>,
  ) {}

  create(createTermDto: CreateTermDto) {
    const term = new this.termModel(createTermDto);
    return term.save();
  }

  findAll() {
    return `This action returns all term`;
  }

  find(query: QueryTermDto) {
    return this.termModel.find().lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} term`;
  }

  update(id: number, updateTermDto: UpdateTermDto) {
    return `This action updates a #${id} term`;
  }

  remove(id: number) {
    return `This action removes a #${id} term`;
  }
}
