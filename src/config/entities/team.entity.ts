import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { TenantEntity } from "./tenant.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity("teams")
export class TeamEntity {
  //COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  @Index(["name", "tenantId"], { unique: true })
  name: string;

  @Column({ name: "tenantId", nullable: false })
  tenantId: string;

  //RELATIONS
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: "tenantId", referencedColumnName: "tenantId" })
  tenant: TenantEntity;

  @ManyToMany(() => EmployeeEntity, (employee) => employee.teams)
  @JoinTable({
    name: "employees_teams_mapping",
    joinColumn: { name: "teamId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "employeeId", referencedColumnName: "id" },
  })
  members: EmployeeEntity[];
}
