import { EncrypterProvider } from '../encrypter.provider';

export class FakeEncrypter implements EncrypterProvider {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
