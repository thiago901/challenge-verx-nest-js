import { Test, TestingModule } from '@nestjs/testing';

import { FakeUserRepository } from '../ports/repositories/fakes/fake-user-repository';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';
import { ListAllUsersUseCase } from './list-all-users-use-case';

describe(ListAllUsersUseCase.name, () => {
  let sut: ListAllUsersUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAllUsersUseCase,
        {
          provide: UserRepositoryInterface,
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepositoryInterface>(
      UserRepositoryInterface,
    );

    sut = module.get<ListAllUsersUseCase>(ListAllUsersUseCase);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should find a list with 2 users ', async () => {
    await userRepository.create(
      new User({
        email: 'johnDoe@mail.com',
        name: 'John',
        password: '123456',
        active: true,
      }),
    );
    await userRepository.create(
      new User({
        email: 'johnDoe2@mail.com',
        name: 'John2',
        password: '123456',
        active: true,
      }),
    );

    const { users } = await sut.execute();

    expect(users).toHaveLength(2);
  });

  it('should not find any users that not exist', async () => {
    const { users } = await sut.execute();

    expect(users).toHaveLength(0);
  });
});
