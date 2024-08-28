import { User } from '@application/users/domain/user';

export abstract class UserRepositoryInterface {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract create(data: User): Promise<User>;
  abstract update(data: User): Promise<User>;
}
