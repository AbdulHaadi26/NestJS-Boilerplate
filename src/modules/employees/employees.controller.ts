import { Controller, Get } from "@nestjs/common";
import { AuthenticatedUser } from "../../common/decorators";
import { EmployeeService } from "./employees.service";
import { AuthUserType } from "../../shared/types";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Get("/profile")
  @ApiBearerAuth()
  @ApiTags("Employees")
  async getProfile(@AuthenticatedUser() user: AuthUserType) {
    return await this.employeesService.findOne(user);
  }
}
