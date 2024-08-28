import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user-use-case';
import { FakeUserRepository } from '../ports/repositories/fakes/fake-user-repository';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';

import { HasherProvider } from '../ports/providers/hasher.provider';
import { FakeHashPassword } from '../ports/providers/fakes/fake-hash-password';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe(CreateUserUseCase.name, () => {
  let sut: CreateUserUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepositoryInterface,
          useClass: FakeUserRepository,
        },
        {
          provide: HasherProvider,
          useClass: FakeHashPassword
        },
      ],
    }).compile();

    userRepository = module.get<UserRepositoryInterface>(
      UserRepositoryInterface,
    );

    sut = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await sut.execute({
      email: 'johnDoe@mail.com',
      name: 'John',
      password: '123456',
    });
    expect(user.id).toBeTruthy();
  });

  it('should not create a existent user', async () => {
    await userRepository.create(
      new User({
        email: 'johnDoe@mail.com',
        name: 'John',
        password: '123456',
        active: true,
      }),
    );

    const execution = sut.execute({
      email: 'johnDoe@mail.com',
      name: 'John',
      password: '123456',
    });

    await expect(execution).rejects.toThrow(UserAlreadyExistsError);

  });
});
