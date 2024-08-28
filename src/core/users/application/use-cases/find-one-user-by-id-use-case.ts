import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';

interface RequestProps {
  id: string;
}
interface ResponseProps {
  user: User | null;
}
@Injectable()
export class FindOneUserByIdUseCase {
  constructor(
    @Inject()
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({ id }: RequestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findById(id);
    return {
      user,
    };
  }
}
