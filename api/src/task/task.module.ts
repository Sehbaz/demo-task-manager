import { Module } from '@nestjs/common';
import { Task } from '../entities/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Project } from '../entities/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
