import { Test, TestingModule } from '@nestjs/testing';

import { FakeUserRepository } from '../ports/repositories/fakes/fake-user-repository';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';

import { HasherProvider } from '../ports/providers/hasher.provider';
import { FakeHashPassword } from '../ports/providers/fakes/fake-hash-password';



import { UserNotFoundError } from './errors/user-not-found-error';
import { UpdateUserUseCase } from './update-user-use-case';

describe(UpdateUserUseCase.name, () => {
  let sut: UpdateUserUseCase;
  let userRepository: UserRepositoryInterface;
  let hasher: HasherProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
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

    hasher = module.get<HasherProvider>(
      HasherProvider,
    );
    userRepository = module.get<UserRepositoryInterface>(
      UserRepositoryInterface,
    );

    sut = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should update a user', async () => {
    const user = new User({
      email: 'johnDoe@mail.com',
      password: await hasher.hash('123456'),
      name:'John',
      active:true
    })
    await userRepository.create(user)
    const response = await sut.execute({
      id:user.id,
      name:'new-name'
    });
    expect(response.user.name).toEqual('new-name');
  });

  it('should not user session when user not exists', async () => {

    const execution = sut.execute({
      email: 'johnDoe@mail.com',
      password: '123456',
      id:"non-exists"
    });

    await expect(execution).rejects.toThrow(UserNotFoundError);

  });
});
