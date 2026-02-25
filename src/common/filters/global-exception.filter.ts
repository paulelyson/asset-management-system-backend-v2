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

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = null;

    console.log(exception)

    // ✅ 1️⃣ Mongoose validation error
    if (exception?.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation error';

      errors = Object.values(exception.errors).map(
        (err: any) => err.message,
      );
    }

    // ✅ 2️⃣ Mongo duplicate key error
    else if (exception?.code === 11000) {
      status = HttpStatus.BAD_REQUEST;

      const field = Object.keys(exception.keyValue)[0];
      const value = exception.keyValue[field];

      message = `${field} must be unique`;
      errors = {
        [field]: `${value} already exists`,
      };
    }

    // ✅ 2️⃣ Dto/ Bad Request  duplicate key error
    else if (exception instanceof BadRequestException) {
      status = exception.getStatus()
      const response = exception.getResponse();;
      message = response['error'] ?? "Bad Request";
      errors = response["message"] ?? []
    }


    response.status(status).json({
      success: false,
      message,
      errors,
      statusCode: status,
    });
  }
}