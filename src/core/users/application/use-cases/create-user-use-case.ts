import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { CreateUserDTO } from '../ports/dtos/create-user.dto';
import { User } from '@application/users/domain/user';
import { HasherProvider } from '../ports/providers/hasher.provider';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject()
    private userRepository: UserRepositoryInterface,
    private hashPassword: HasherProvider,
  ) {}

  public async execute({ email, name, password }: CreateUserDTO) {
    const hasUser = await this.userRepository.findByEmail(email);
    if (hasUser) {
      throw new UserAlreadyExistsError();
    }
    const hashedPassword = await this.hashPassword.hash(password);
    const user = new User({
      email,
      name,
      password: hashedPassword,
      active: true,
    });

    await this.userRepository.create(user);
    return user;
  }
}
