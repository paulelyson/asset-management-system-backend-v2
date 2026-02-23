import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Error as MongooseError } from 'mongoose';

@Catch(MongooseError.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  private logger = new Logger(MongoExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(exception.message);

    const errors = Object.values(exception.errors).map(
      (err: any) => err.message,
    );

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation error',
      errors,
    });
  }
}
