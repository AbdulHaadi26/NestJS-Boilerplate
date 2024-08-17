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
import { TeamEntity } from "./team.entity";

@Entity("employees")
export class EmployeeEntity {
  //COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  @Index(["email"], { unique: true })
  email: string;

  @Column({ name: "tenantId", nullable: false })
  tenantId: string;

  //RELATIONS
  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: "tenantId", referencedColumnName: "tenantId" })
  tenant: TenantEntity;

  @ManyToMany(() => TeamEntity, (team) => team.members)
  @JoinTable({
    name: "employees_teams_mapping",
    joinColumn: { name: "employeeId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "teamId", referencedColumnName: "id" },
  })
  teams: TeamEntity[];
}
