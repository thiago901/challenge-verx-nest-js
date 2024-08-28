import { User } from '@application/users/domain/user';
import { UserRepositoryInterface } from '../user-repository.interface';

export class FakeUserRepository implements UserRepositoryInterface {
  private repository: User[] = [];

  async findAll(): Promise<User[]> {
    return this.repository;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.repository.find((user) => email === user.email);
    if (!user) {
      return null;
    }
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.repository.find((user) => id === user.id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(user: User): Promise<User> {
    this.repository.push(user);

    return user;
  }
  async update(user: User): Promise<User> {
    const userIndex = this.repository.findIndex((item) => item.id === user.id);
    this.repository[userIndex] = user;

    return user;
  }
}
