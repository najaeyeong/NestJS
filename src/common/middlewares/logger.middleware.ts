import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    //미들웨어는 기본적으로 컨트롤러 앞에서 실행되기때문에 response 이전에 실행된다.
    // req -> 미들웨어 -> 라우터 -> res
    this.logger.log(`${req.ip},${req.method}, ${req.originalUrl}`);
    //response까지 완료가 된후에 실행 하라는 것
    res.on('finish', () => {
      this.logger.log(
        `${req.ip},${req.method}, ${req.originalUrl},${res.statusCode}`,
      );
    });
    next();
  }
}
