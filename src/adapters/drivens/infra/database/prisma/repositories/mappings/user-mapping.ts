import { User } from '@application/users/domain/user';
import { User as UserPrisma } from '@prisma/client';

export class UserMapping {
  static toDomain({ id, name, email, password, active }: UserPrisma) {
    return new User(
      {
        name,
        active,
        email,
        password,
      },
      id,
    );
  }

  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      password: user.password,
    };
  }
}
