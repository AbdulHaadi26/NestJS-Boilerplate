import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignInDto } from "../../common/dtos";
import { SignInType } from "../../shared/types";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  describe("signIn", () => {
    it("On successful sign in, should return a token", async () => {
      const signInDto: SignInDto = {
        email: "test@example.com",
        password: "password123",
      };

      const result: SignInType = { token: "testToken" };

      mockAuthService.signIn.mockResolvedValue(result);

      expect(await authController.signIn(signInDto)).toBe(result);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(signInDto);
    });

    it("should throw an HttpException if the employee is not found", async () => {
      const signInDto: SignInDto = {
        email: "test@example.com",
        password: "password123",
      };

      mockAuthService.signIn.mockRejectedValue(
        new HttpException("Employee not found", HttpStatus.UNAUTHORIZED)
      );

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        new HttpException("Employee not found", HttpStatus.UNAUTHORIZED)
      );
      expect(mockAuthService.signIn).toHaveBeenCalledWith(signInDto);
    });

    it("should throw an HttpException if the employee password is incorrect", async () => {
      const signInDto: SignInDto = {
        email: "test@example.com",
        password: "password123",
      };

      mockAuthService.signIn.mockRejectedValue(
        new HttpException(
          "Employee password is incorrect",
          HttpStatus.UNAUTHORIZED
        )
      );

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        new HttpException(
          "Employee password is incorrect",
          HttpStatus.UNAUTHORIZED
        )
      );
      expect(mockAuthService.signIn).toHaveBeenCalledWith(signInDto);
    });
  });
});
