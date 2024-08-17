import { SetMetadata } from "@nestjs/common";

export const APIPermissions = (permissions: string[]) =>
  SetMetadata("permissions", {
    permissions,
  });
