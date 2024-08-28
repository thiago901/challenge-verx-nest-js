import { Module } from '@nestjs/common';

import { HTTPModule } from '@adapters/drivers/http/http.module';

import ProvidersModule from '@adapters/drivens/infra/providers/providers.module';
import { AuthModule } from '@adapters/drivens/infra/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { schemaEnv } from '@adapters/drivens/infra/envs/env';
import { EnvModule } from '@adapters/drivens/infra/envs/env.module';
import DatabaseModule from '@adapters/drivens/infra/database/prisma/database.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    HTTPModule,
    AuthModule,
    EnvModule,
   
    ConfigModule.forRoot({
      validate: (env) => schemaEnv.parse(env),
      isGlobal: true,
    }),
    {
      module: ProvidersModule,
      global: true,
    },
    {
      module: DatabaseModule,
      global: true,
    },
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  controllers: [],
  
})
export class AppModule {}
