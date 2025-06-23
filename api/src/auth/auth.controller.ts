import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // login
  @Post('login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    // validate user
    const user = await this.authService.validateUser(body.email, body.password);

    // login service
    return this.authService.login(user);
  }
}
