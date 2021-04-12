export default interface IHashprovider {
  generatehash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
