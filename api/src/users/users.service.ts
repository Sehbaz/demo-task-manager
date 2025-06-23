import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { users } from 'src/drizzle/schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  async findAll() {
    return await db.select().from(users);
  }

  async findOne(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async create(user: CreateUserDto) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async update(id: number, user: CreateUserDto) {
    const [updatedUser] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async delete(id: number) {
    await db.delete(users).where(eq(users.id, id));
  }
}
