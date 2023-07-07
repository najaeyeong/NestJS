import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//CurrentUser는 데코레이터를 만드는 함수에 request로 부터 받은 정보중에서 user 정보만을 반환하는 함수를 넣어 데코레이터를 만든는 함수
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
