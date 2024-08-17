import * as bcrypt from "bcrypt";

const hash = async (str: string) => {
  return await bcrypt.hash(str, Number(process.env.HASH_KEY));
};

const compare = async (originalStr: string, hashedStr: string) => {
  return bcrypt.compare(originalStr, hashedStr);
};

export { hash, compare };
