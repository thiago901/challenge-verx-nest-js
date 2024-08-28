import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';
import { UserNotFoundError } from './errors/user-not-found-error';

interface RequestProps {
  id: string;
}
interface ResponseProps {
  user: User;
}
@Injectable()
export class DesactivateOneUserByIdUseCase {
  constructor(
    @Inject()
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({ id }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    user.active = false;
    await this.userRepository.update(user);
    return {
      user,
    };
  }
}
