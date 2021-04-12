import { hash, compare } from "bcryptjs";
import IHashprovider from "../models/IHashProvider";

class BCryptHashProvider implements IHashprovider {
  public async generatehash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
