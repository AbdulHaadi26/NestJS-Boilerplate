import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { EncyrptionService } from "../../shared/services/encryption.service";

@Module({
  imports: [],
  providers: [AuthService, EncyrptionService],
  controllers: [AuthController],
})
export class AuthModule {}
