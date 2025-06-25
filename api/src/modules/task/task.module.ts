// src/modules/task/task.module.ts
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

import { DrizzleTaskRepository } from './task.repository.impl';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'TaskRepository',
      useClass: DrizzleTaskRepository,
    },
  ],
})
export class TaskModule {}
