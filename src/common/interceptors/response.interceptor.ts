import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { of, throwError } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const { getResponse } = context.switchToHttp();
    const response = getResponse<Response>();

    try {
      const data = await next.handle().toPromise();

      const { statusCode } = response;

      return of({
        statusCode,
        message: HttpStatus[statusCode],
        data,
      });
    } catch (error) {
      const statusCode = error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

      let message = HttpStatus[statusCode];

      if (typeof error === "object" && error?.response) {
        message = error.response.message;
      }

      response.status(statusCode).json({
        statusCode,
        message,
        data: null,
      });

      return throwError(error);
    }
  }
}
