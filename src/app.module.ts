import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { EmployeesModule, AuthModule } from "./modules";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    EmployeesModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
