import { Module } from '@nestjs/common';

import { UserRepositoryInterface } from '@application/users/application/ports/repositories/user-repository.interface';

import { UserRepository } from './repositories/user-repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository,
    },
  ],
  exports: [PrismaService, UserRepositoryInterface],
})
export default class DatabaseModule {}
