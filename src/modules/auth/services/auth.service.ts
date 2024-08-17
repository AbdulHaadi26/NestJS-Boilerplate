import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../../../config/entities";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignInType } from "../../../shared/types/auth.types";
import { SignInDto } from "../dtos/signIn.dto";
import { compare } from "../../../shared/helpers/bcrypt";

@Injectable()
export class AuthService {
  private readonly employeeRepository: Repository<EmployeeEntity>;
  constructor(
    private readonly dataSoruce: DataSource,
    private readonly jwtService: JwtService
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

    const isPasswordValid = await compare(password, employee.password);

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
