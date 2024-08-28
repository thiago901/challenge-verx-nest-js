import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';

import { HasherProvider } from '../ports/providers/hasher.provider';
import { EncrypterProvider } from '../ports/providers/encrypter.provider';
import { CrendentialsNotMatchFoundError } from './errors/credentials-not-match-error';

interface RequestProps {
  email: string;
  password: string;
}
@Injectable()
export class SessionUserUseCase {
  constructor(
    @Inject()
    private userRepository: UserRepositoryInterface,
    private encrypterProvider: EncrypterProvider,
    private hasherProvider: HasherProvider,
  ) {}

  public async execute({ email, password }: RequestProps) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CrendentialsNotMatchFoundError();
    }
    const isPasswordValid = await this.hasherProvider.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CrendentialsNotMatchFoundError();
    }
    const accessToken = await this.encrypterProvider.encrypt({ sub: user.id });

    return {
      access_token: accessToken,
    };
  }
}
