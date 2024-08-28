import { EncrypterProvider } from "../encrypter.provider";
import { HasherProvider } from "../hasher.provider";



export class FakeEncrypter implements EncrypterProvider {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }  
  
}
