import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //console.log('Before...');
    //컴트롤러 이전 이후
    return next.handle().pipe(
      //After....
      //서비스에서 반환한 response 를 data로 받아서 다음 형식으로 바꾸어 다시 response해준다.
      map((data) => ({
        success: true,
        data: data,
      })),
    );
  }
}
