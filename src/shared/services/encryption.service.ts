import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
@Injectable()
export class EncyrptionService {
  public async bcryptHash(str: string) {
    return await bcrypt.hash(str, Number(process.env.HASH_KEY));
  }

  public async bcryptCompare(originalStr: string, hashedStr: string) {
    return bcrypt.compare(originalStr, hashedStr);
  }
}
