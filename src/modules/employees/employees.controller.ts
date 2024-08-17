import { Controller, Get } from "@nestjs/common";
import { AuthenticatedUser } from "src/common/decorators/user.decorator";
import { EmployeeService } from "src/modules/employees/services/employees.service";
import { AuthUser } from "src/shared/types/auth.types";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Get("/profile")
  async getProfile(@AuthenticatedUser() user: AuthUser) {
    return await this.employeesService.findOne(user);
  }
}
