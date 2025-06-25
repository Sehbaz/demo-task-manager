import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../auth/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  private readonly dummyUser = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2b$10$FnWM3yVrJ3EPoWV/vHpu3OwBKzLrEKMjLj6SjXUI/6CFHQoHFBxCq',
  };

  async validateUser(email: string, password: string): Promise<User> {
    // NOTE: When implementing real user registration and database-backed authentication, uncomment this line to fetch the user from the database
    // const user = await this.authRepo.findByEmail(email);

    const user = email === this.dummyUser.email ? this.dummyUser : null;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.authRepo.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.authRepo.createUser({ ...dto, password: hashed });
    return { id: user.id, email: user.email, name: user.name };
  }
}
