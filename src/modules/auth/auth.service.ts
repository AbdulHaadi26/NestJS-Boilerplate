import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../../database/entities";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignInType } from "../../shared/types";
import { SignInDto } from "../../common/dtos";
import { EncyrptionService } from "../../shared/services";

@Injectable()
export class AuthService {
  private readonly employeeRepository: Repository<EmployeeEntity>;
  constructor(
    private readonly dataSoruce: DataSource,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncyrptionService
  ) {
    this.employeeRepository = this.dataSoruce.getRepository(EmployeeEntity);
  }

  public async signIn(body: SignInDto): Promise<SignInType> {
    const { email, password } = body;
    const employee = await this.employeeRepository.findOneBy({
      email,
    });

    if (!employee) {
      throw new HttpException("Employee not found", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.encryptService.bcryptCompare(
      password,
      employee.password
    );

    if (!isPasswordValid) {
      throw new HttpException(
        "Employee password is incorrect",
        HttpStatus.UNAUTHORIZED
      );
    }

    return {
      token: this.generateToken(employee),
    };
  }

  private generateToken(employee: EmployeeEntity): string {
    return this.jwtService.sign(
      {
        id: employee.id,
        tenantId: employee.tenantId,
      },
      {
        secret: process.env.JWT_SECRET,
      }
    );
  }
}
