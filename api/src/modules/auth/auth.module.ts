import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { DrizzleAuthRepository } from './auth.repository.impl';

@Module({
  imports: [
    JwtModule.register({
      // NOTE: secret value has to be updated once productionised
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthRepository',
      useClass: DrizzleAuthRepository,
    },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
