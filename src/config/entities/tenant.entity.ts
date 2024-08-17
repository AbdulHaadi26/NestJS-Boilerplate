import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity("tenants")
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ name: "tenantId", unique: true, nullable: false })
  @Index("tenant_key_idx")
  tenantId: string;
}
