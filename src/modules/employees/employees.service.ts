import { Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../../config/entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class EmployeeService {
  private readonly employeeRepository: Repository<EmployeeEntity>;
  constructor(private readonly dataSoruce: DataSource) {
    this.employeeRepository = this.dataSoruce.getRepository(EmployeeEntity);
  }

  public async findOne(email: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.find({
      where: { email },
      relations: ["tenant", "teams"],
    });

    if (employee.length <= 0) {
      throw new Error("Employee not found");
    }

    return employee[0];
  }
}
