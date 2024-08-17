import { Controller, Get } from "@nestjs/common";
import { AuthenticatedUser } from "../../common/decorators";
import { EmployeeService } from "./employees.service";
import { AuthUserType } from "../../shared/types";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Get("/profile")
  async getProfile(@AuthenticatedUser() user: AuthUserType) {
    return await this.employeesService.findOne(user);
  }
}
