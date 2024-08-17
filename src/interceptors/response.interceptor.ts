import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { of, throwError } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const { getRequest, getResponse } = context.switchToHttp();
    const response = getResponse<Response>();
    const request = getRequest<Request>();

    try {
      const data = await next.handle().toPromise();

      if (context.getType() === "http") {
        const { statusCode } = response;
        return of({
          statusCode,
          message: HttpStatus[statusCode],
          data,
        });
      }

      return data;
    } catch (error) {
      if (context.getType() === "http") {
        const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;

        const responseMessage = error.getResponse();

        let message = HttpStatus[statusCode];

        if (error && error.message) {
          message = error.message;
        }

        let logMessage = responseMessage;

        if (
          typeof responseMessage === "object" &&
          "message" in responseMessage
        ) {
          message = responseMessage.message as string;
          logMessage = message;
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
}
