import { User } from '@application/users/domain/user';

export class UserMapping {
  static toView({ id, name, email, active }: User) {
    return {
      id,
      name,
      email,
      active,
    };
  }
}
