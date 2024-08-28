import { Test, TestingModule } from '@nestjs/testing';

import { FakeUserRepository } from '../ports/repositories/fakes/fake-user-repository';
import { UserRepositoryInterface } from '../ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';
import { DesactivateOneUserByIdUseCase } from './desactivate-one-user-by-id-use-case';
import { UserNotFoundError } from './errors/user-not-found-error';

describe(DesactivateOneUserByIdUseCase.name, () => {
  let sut: DesactivateOneUserByIdUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DesactivateOneUserByIdUseCase,
        {
          provide: UserRepositoryInterface,
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepositoryInterface>(
      UserRepositoryInterface,
    );

    sut = module.get<DesactivateOneUserByIdUseCase>(
      DesactivateOneUserByIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should desactivate a user', async () => {
    const user = new User({
      email: 'johnDoe@mail.com',
      name: 'John',
      password: '123456',
      active: true,
    });
    await userRepository.create(user);

    await sut.execute({ id: user.id });
    const userUpdated = await userRepository.findById(user.id);
    expect(userUpdated.active).toBeFalsy();
  });

  it('should not desactivate a user that not exist', async () => {
    const execution = sut.execute({
      id: 'fake-id',
    });

    await expect(execution).rejects.toThrow(UserNotFoundError);


  });
});
