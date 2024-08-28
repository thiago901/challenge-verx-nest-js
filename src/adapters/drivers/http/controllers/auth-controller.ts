import { z } from 'zod';

import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { SessionUserUseCase } from '@application/users/application/use-cases/authetication-user-use-case';
import { Public } from '@adapters/drivens/infra/auth/public';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkInBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type CheckInBodySchema = z.infer<typeof checkInBodySchema>;

@Controller('/sessions')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private sessionUserUseCase: SessionUserUseCase) {}

  @Post('/')
  @Public()
  async session(@Body() body: CheckInBodySchema) {
    const { email, password } = body;

    const { access_token } = await this.sessionUserUseCase.execute({
      email,
      password,
    });

    return {
      access_token,
    };
  }
}
