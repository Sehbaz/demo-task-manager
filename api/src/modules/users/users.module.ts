import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import db from 'src/drizzle';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'DRIZZLE_DB',
      useValue: db,
    },
  ],
})
export class UsersModule {}
