import { UserRepositoryInterface } from '@application/users/application/ports/repositories/user-repository.interface';
import { User } from '@application/users/domain/user';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UserMapping } from './mappings/user-mapping';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { active: true } });
    return users.map(UserMapping.toDomain);
  }
  async update(data: User): Promise<User> {
    await this.prisma.user.update({
      data: {
        active: data.active,
        email: data.email,
        name: data.name,
        password: data.password,
      },
      where: {
        id: data.id,
      },
    });
    return data;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    if (user) {
      return new User(user, user.id);
    } else {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    return new User(user, user.id);
  }

  async create(user: User): Promise<User> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active,
        password: user.password,
      },
    });

    return new User(user, user.id);
  }
}
