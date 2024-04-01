import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { BaseResponse } from '../responses/base.response'
import snakeCaseKeys from 'snakecase-keys'

@Injectable()
export class DataTransformInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data instanceof BaseResponse) {
                    return data
                } else {
                    return {
                        success: true,
                        data,
                    }
                }
            }),
        )
    }
}
