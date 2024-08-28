import { Test, TestingModule } from '@nestjs/testing';

import { FakeUserRepository } from '../ports/repositories/fakes/fake-user-repository';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';

import { FindOneUserByIdUseCase } from './find-one-user-by-id-use-case';

describe(FindOneUserByIdUseCase.name, () => {
  let sut: FindOneUserByIdUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUserByIdUseCase,
        {
          provide: UserRepositoryInterface,
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepositoryInterface>(
      UserRepositoryInterface,
    );

    sut = module.get<FindOneUserByIdUseCase>(FindOneUserByIdUseCase);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should find a user by id', async () => {
    const createUser = new User({
      email: 'johnDoe@mail.com',
      name: 'John',
      password: '123456',
      active: true,
    });
    await userRepository.create(createUser);

    const { user } = await sut.execute({ id: createUser.id });

    expect(user.id).toBeTruthy();
  });

  it('should not find a user that not exist', async () => {
    const { user } = await sut.execute({
      id: 'fake-id',
    });

    expect(user).toBeFalsy();
  });
});
