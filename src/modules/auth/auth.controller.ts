import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInType } from "../../shared/types";
import { SignInDto } from "../../common/dtos";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @ApiTags("Auth")
  async signIn(@Body() body: SignInDto): Promise<SignInType> {
    return await this.authService.signIn(body);
  }
}
