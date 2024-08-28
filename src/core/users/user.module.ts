import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case';
import { DesactivateOneUserByIdUseCase } from './application/use-cases/desactivate-one-user-by-id-use-case';
import { FindOneUserByIdUseCase } from './application/use-cases/find-one-user-by-id-use-case';
import { ListAllUsersUseCase } from './application/use-cases/list-all-users-use-case';
import { SessionUserUseCase } from './application/use-cases/authetication-user-use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CreateUserUseCase,
    DesactivateOneUserByIdUseCase,
    FindOneUserByIdUseCase,
    ListAllUsersUseCase,
    UpdateUserUseCase,
    SessionUserUseCase
  ],
  exports: [
    CreateUserUseCase,
    DesactivateOneUserByIdUseCase,
    FindOneUserByIdUseCase,
    ListAllUsersUseCase,
    SessionUserUseCase,
    UpdateUserUseCase
  ],
})
export class UserModule {}
