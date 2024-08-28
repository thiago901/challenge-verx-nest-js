import { Module } from '@nestjs/common';

import { UserModule } from '@application/users/user.module';
import { UserController } from './controllers/user-controller';
import { AuthController } from './controllers/auth-controller';
import DatabaseModule from '@adapters/drivens/infra/database/prisma/database.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';


@Module({
  imports: [DatabaseModule,UserModule],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class HTTPModule {}
