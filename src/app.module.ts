import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { EmployeesModule } from "./modules/employees/employees.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "./config/typeorm.module";

@Module({
  imports: [TypeOrmModule, EmployeesModule, ConfigModule.forRoot()],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
