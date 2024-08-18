import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { JWTMiddleware } from "./jwt.middleware";
import { HttpException, HttpStatus } from "@nestjs/common";
import { TokenValidationError } from "../../shared/constants";

describe("JWTMiddleware", () => {
  let jwtMiddleware: JWTMiddleware;
  let jwtService: JwtService;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JWTMiddleware,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    jwtMiddleware = module.get<JWTMiddleware>(JWTMiddleware);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(jwtMiddleware).toBeDefined();
  });

  describe("use", () => {
    it("should call next if the token is valid", async () => {
      const token = "validToken";
      const payload = { userId: 1 };

      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as unknown as Request;
      const res = {} as Response;
      const next: NextFunction = jest.fn();

      mockJwtService.verifyAsync.mockResolvedValue(payload);

      await jwtMiddleware.use(req, res, next);

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
        secret: process.env.JWT_SECRET,
      });
      expect(req["user"]).toEqual(payload);
      expect(next).toHaveBeenCalled();
    });

    it("should throw HttpException if the token is invalid", async () => {
      const token = "invalidToken";

      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as unknown as Request;
      const res = {} as Response;
      const next: NextFunction = jest.fn();

      mockJwtService.verifyAsync.mockRejectedValue(new Error("Invalid token"));

      await expect(jwtMiddleware.use(req, res, next)).rejects.toThrow(
        new HttpException(TokenValidationError, HttpStatus.UNAUTHORIZED)
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
        secret: process.env.JWT_SECRET,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should throw HttpException if the authorization header is missing", async () => {
      const req = {
        headers: {},
      } as unknown as Request;
      const res = {} as Response;
      const next: NextFunction = jest.fn();

      await expect(jwtMiddleware.use(req, res, next)).rejects.toThrow(
        new HttpException(TokenValidationError, HttpStatus.UNAUTHORIZED)
      );

      expect(next).not.toHaveBeenCalled();
    });
  });
});
