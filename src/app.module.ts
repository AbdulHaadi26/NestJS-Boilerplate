import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { EmployeesModule } from "./modules/employees/employees.module";

@Module({
  imports: [EmployeesModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
