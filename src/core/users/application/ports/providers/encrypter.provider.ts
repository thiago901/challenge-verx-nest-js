export abstract class EncrypterProvider {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
