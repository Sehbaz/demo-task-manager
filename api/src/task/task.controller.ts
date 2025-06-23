import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../entities/entities';

import { CreateTaskDto, CreateTaskSchema, TaskSchema } from './task.dto';
import { Type } from '@sinclair/typebox';
import { Validate } from 'nestjs-typebox';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // get all project
  @Get()
  @Validate({ response: Type.Array(TaskSchema) })
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  // get by id project
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task | null> {
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new Error('no task found');
    } else {
      return task;
    }
  }

  // create project
  @Post(':projectID')
  @Validate({
    request: [
      { name: 'projectID', type: 'param', schema: Type.Number() },
      { type: 'body', schema: CreateTaskSchema },
    ],
    response: TaskSchema,
  })
  async create(projectID: number, task: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(projectID, task);
  }

  // update project
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() task: Task,
  ): Promise<Task | null> {
    return await this.taskService.update(id, task);
  }

  // delte project
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.taskService.delete(id);
  }
}
