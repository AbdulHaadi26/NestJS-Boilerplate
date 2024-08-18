import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInDto {
  @ApiProperty({ description: "Employee email" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Employee password" })
  @IsStrongPassword()
  password: string;
}
