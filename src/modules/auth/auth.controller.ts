import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { SignInType } from "../../shared/types/auth.types";
import { SignInDto } from "./dtos/signIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async signIn(@Body() body: SignInDto): Promise<SignInType> {
    return await this.authService.signIn(body);
  }
}
