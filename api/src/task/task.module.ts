import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

import db from 'src/drizzle';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'DRIZZLE_DB',
      useValue: db,
    },
  ],
})
export class TaskModule {}
