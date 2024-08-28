import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';

import { HasherProvider } from '../ports/providers/hasher.provider';
import { UserNotFoundError } from './errors/user-not-found-error';

interface RequesProps {
  id: string;
  email?: string;
  name?: string;
  password?: string;
}
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject()
    private userRepository: UserRepositoryInterface,
    private hashPassword: HasherProvider,
  ) {}

  public async execute({ id, email, name, password }: RequesProps) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    user.email = email || user.email;
    user.name = name || user.name;

    if (!!password) {
      user.password = await this.hashPassword.hash(password);
    }

    await this.userRepository.update(user);
    return { user };
  }
}
