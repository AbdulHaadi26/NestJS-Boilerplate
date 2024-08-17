import { MiddlewareConsumer, Module } from "@nestjs/common";
import { JWTMiddleware } from "../../common/middlewares/jwt.middleware";
import { EmployeeService } from "./services/employees.service";
import { EmployeesController } from "./employees.controller";

@Module({
  imports: [],
  providers: [EmployeeService],
  controllers: [EmployeesController],
})
export class EmployeesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes(EmployeesController);
  }
}
