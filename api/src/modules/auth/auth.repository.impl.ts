import { db } from '../../drizzle';
import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { AuthRepository } from './auth.repository';
import { RegisterDto, User } from './auth.dto';

export class DrizzleAuthRepository implements AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user ?? null;
  }

  async createUser(dto: RegisterDto): Promise<User> {
    const [user] = await db.insert(users).values(dto).returning();
    return user;
  }
}
