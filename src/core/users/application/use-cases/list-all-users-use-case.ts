import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@prisma/client';

// interface RequestProps {
//   id: string;
// }
interface ResponseProps {
  users: User[];
}
@Injectable()
export class ListAllUsersUseCase {
  constructor(
    @Inject()
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute(): Promise<ResponseProps> {
    const users = await this.userRepository.findAll();
    return {
      users,
    };
  }
}
