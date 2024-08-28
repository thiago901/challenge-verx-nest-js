import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { Public } from '@adapters/drivens/infra/auth/public';

import { DesactivateOneUserByIdUseCase } from '@application/users/application/use-cases/desactivate-one-user-by-id-use-case';
import { FindOneUserByIdUseCase } from '@application/users/application/use-cases/find-one-user-by-id-use-case';
import { ListAllUsersUseCase } from '@application/users/application/use-cases/list-all-users-use-case';
import { CreateUserUseCase } from '@application/users/application/use-cases/create-user-use-case';
import { UpdateUserUseCase } from '@application/users/application/use-cases/update-user-use-case';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  CreateUserProps,
  createUserSchema,
} from './validations/create-user.validate';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';
import { UserMapping } from '../mapping/user-mapping';
import {
  UpdateUserProps,
  updateUserSchema,
} from './validations/update-user.validate';

@Controller('/users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private desactivateOneUserByIdUseCase: DesactivateOneUserByIdUseCase,
    private findOneUserByIdUseCase: FindOneUserByIdUseCase,
    private listAllUsersUseCase: ListAllUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('/')
  @Public()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserProps) {
    const { email, name, password } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return {
      user: UserMapping.toView(user),
    };
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.desactivateOneUserByIdUseCase.execute({
      id,
    });
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    const { user } = await this.findOneUserByIdUseCase.execute({
      id,
    });

    return {
      user: user ? UserMapping.toView(user) : null,
    };
  }

  @Get('/')
  async getAll() {
    const { users } = await this.listAllUsersUseCase.execute();
    return {
      users: users.map(UserMapping.toView),
    };
  }
  @Put('/:id')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Param('id') id: string, @Body() body: UpdateUserProps) {
    const { email, name, password } = body;
    const { user } = await this.updateUserUseCase.execute({
      id,
      email,
      name,
      password,
    });
    return {
      user: UserMapping.toView(user),
    };
  }
}
