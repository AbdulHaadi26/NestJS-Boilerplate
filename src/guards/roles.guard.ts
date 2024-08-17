import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = request["user"];

      if (!user) {
        return true;
      }

      const permissionsMetadata = this.reflector.get(
        "permissions",
        context.getHandler()
      );

      console.log("[PERMISSION GUARD]: ", permissionsMetadata);
      //APPLY PERMISSION CHEC HERE
      return true;
    } catch (error) {
      console.error("[PERMISSION GUARD]: ", error);
      return false;
    }
  }
}
