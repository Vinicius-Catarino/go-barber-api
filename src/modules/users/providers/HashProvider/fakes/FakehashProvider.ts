import IHashprovider from "../models/IHashProvider";

class FakeHashProvider implements IHashprovider {
  public async generatehash(payload: string): Promise<string> {
    return payload;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
