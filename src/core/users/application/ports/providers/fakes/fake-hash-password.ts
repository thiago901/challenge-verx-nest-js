import { HasherProvider } from '../hasher.provider';

export class FakeHashPassword implements HasherProvider {
  async hash(plain: string): Promise<string> {
    return `${plain}-hashed`;
  }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed;
  }
}
