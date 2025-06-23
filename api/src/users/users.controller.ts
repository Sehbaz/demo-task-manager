import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/entities';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // get all user
  @Get()
  async findAll(): Promise<User[]> {
    console.log('GET /users hit');
    return await this.userService.findAll();
  }

  // get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('no user found');
    } else {
      return user;
    }
  }

  // create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  // update user
  @Put(':id')
  async update(@Param() id: number, @Body() user: User): Promise<User | null> {
    return await this.userService.update(id, user);
  }

  // delete user
  @Delete(':id')
  async delete(@Param() id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
