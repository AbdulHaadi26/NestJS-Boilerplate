import { Controller, Get, Param } from "@nestjs/common";
import { EmployeeService } from "src/modules/employees/employees.service";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Get("/:email")
  async getEmployees(@Param("email") email: string) {
    return await this.employeesService.findOne(email);
  }
}
