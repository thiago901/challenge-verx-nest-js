import { HasherProvider } from '@application/users/application/ports/providers/hasher.provider';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHash implements HasherProvider {
  private SALT_LENGTH = 8;
  async hash(plain: string): Promise<string> {
    const hashed = await bcrypt.hash(plain, this.SALT_LENGTH);
    return hashed;
  }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
