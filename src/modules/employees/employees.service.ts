import { Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../../database/entities";
import { DataSource, Repository } from "typeorm";
import { AuthUserType } from "../../shared/types";

@Injectable()
export class EmployeeService {
  private readonly employeeRepository: Repository<EmployeeEntity>;
  constructor(private readonly dataSoruce: DataSource) {
    this.employeeRepository = this.dataSoruce.getRepository(EmployeeEntity);
  }

  public async findOne(user: AuthUserType): Promise<EmployeeEntity> {
    const { id, tenantId } = user;

    const employee = await this.employeeRepository.findOne({
      where: { id, tenantId },
      select: {
        id: true,
        email: true,
        name: true,
        tenant: {
          tenantId: true,
          name: true,
        },
        teams: {
          id: true,
          name: true,
        },
      },
      relations: ["tenant", "teams"],
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }
}
