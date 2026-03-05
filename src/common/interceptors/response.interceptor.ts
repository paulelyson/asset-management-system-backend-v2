import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}


@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((resp: any) => ({
        data: resp?.data ?? resp,
        total: resp?.total ?? 0,
        page: resp?.page ?? 1,
        limit: resp?.limit ?? 25,
        hasNextPage: resp?.hasNextPage ?? false,
        message: resp?.message ?? 'Request successful',
        success: true,
      })),
    );
  }
}