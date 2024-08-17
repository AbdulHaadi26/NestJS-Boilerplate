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
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    return next();
  }
}
