import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { EmployeeService } from "src/services/employees.service";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Get("")
  getEmployees() {
    try {
      return [];
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
