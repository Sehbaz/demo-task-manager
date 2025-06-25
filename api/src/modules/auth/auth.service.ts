import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // dummy data
  private users = [
    {
      id: 1,
      email: 'sehbaz@test.com',
      password: bcrypt.hashSync('password777', 10),
    },
  ];
  constructor(private jwtService: JwtService) {}

  // validate user
  async validateUser(email: string, passwprd: string) {
    const user = this.users.find((user) => user.email == email);

    if (!user || !(await bcrypt.compare(passwprd, user.password))) {
      throw new UnauthorizedException('invalid creds');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  // login
  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
