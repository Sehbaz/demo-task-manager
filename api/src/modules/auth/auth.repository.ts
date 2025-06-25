import { RegisterDto, User } from './auth.dto';

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(dto: RegisterDto): Promise<User>;
}
