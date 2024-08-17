import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  private logger = new Logger(JWTMiddleware.name);

  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      return next();
    } catch (e) {
      this.logger.error(e.message, req, e);
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
