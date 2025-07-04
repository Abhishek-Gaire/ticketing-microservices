import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Promise<Buffer>;
    return `${buffer.toString()}.${salt}`;
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Promise<Buffer>;

    return hashedPassword === buffer.toString();
  }
}
