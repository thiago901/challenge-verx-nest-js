import { Test, TestingModule } from '@nestjs/testing';

import { FakeUserRepository } from '../ports/repositories/fakes/fake-user-repository';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';

import { HasherProvider } from '../ports/providers/hasher.provider';
import { FakeHashPassword } from '../ports/providers/fakes/fake-hash-password';
import { SessionUserUseCase } from './authetication-user-use-case';
import { EncrypterProvider } from '../ports/providers/encrypter.provider';
import { FakeEncrypter } from '../ports/providers/fakes/fake-encrypter';
import { CrendentialsNotMatchFoundError } from './errors/credentials-not-match-error';

describe(SessionUserUseCase.name, () => {
  let sut: SessionUserUseCase;
  let userRepository: UserRepositoryInterface;
  let hasher: HasherProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionUserUseCase,
        {
          provide: UserRepositoryInterface,
          useClass: FakeUserRepository,
        },
        {
          provide: HasherProvider,
          useClass: FakeHashPassword,
        },
        {
          provide: EncrypterProvider,
          useClass: FakeEncrypter,
        },
      ],
    }).compile();

    hasher = module.get<HasherProvider>(HasherProvider);
    userRepository = module.get<UserRepositoryInterface>(
      UserRepositoryInterface,
    );

    sut = module.get<SessionUserUseCase>(SessionUserUseCase);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user session', async () => {
    const user = new User({
      email: 'johnDoe@mail.com',
      password: await hasher.hash('123456'),
      name: 'John',
      active: true,
    });
    await userRepository.create(user);
    const { access_token } = await sut.execute({
      email: 'johnDoe@mail.com',
      password: '123456',
    });
    expect(access_token).toBeTruthy();
  });

  it('should not user session with wrong credentials', async () => {
    const user = new User({
      email: 'johnDoe@mail.com',
      password: await hasher.hash('123456'),
      name: 'John',
      active: true,
    });
    await userRepository.create(user);
    const execution = sut.execute({
      email: 'johnDoe@mail.com',
      password: 'wrong-password',
    });

    await expect(execution).rejects.toThrow(CrendentialsNotMatchFoundError);
  });
  it('should not user session when user not exists', async () => {
    const execution = sut.execute({
      email: 'johnDoe@mail.com',
      password: '123456',
    });

    await expect(execution).rejects.toThrow(CrendentialsNotMatchFoundError);
  });
});
