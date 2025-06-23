import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategey } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'supersecret',
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  providers: [AuthService, JwtStrategey],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
