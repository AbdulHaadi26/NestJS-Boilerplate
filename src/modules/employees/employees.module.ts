import { MiddlewareConsumer, Module } from "@nestjs/common";
import { JWTMiddleware } from "src/middlewares/jwt.middleware";
import { EmployeeService } from "src/services/employees.service";
import { EmployeesController } from "./employees.controller";

@Module({
  providers: [EmployeeService],
  controllers: [EmployeesController],
})
export class EmployeesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes(EmployeesController);
  }
}
