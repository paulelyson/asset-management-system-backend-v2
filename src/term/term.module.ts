import { Module } from '@nestjs/common';
import { TermService } from './term.service';
import { TermController } from './term.controller';
import { Term, TermSchema } from './schemas/term.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Term.name, schema: TermSchema }]),
  ],
  controllers: [TermController],
  providers: [TermService],
})
export class TermModule {}
