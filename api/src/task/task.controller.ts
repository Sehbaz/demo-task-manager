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

import { CreateTaskDto, CreateTaskSchema, Task, TaskSchema } from './task.dto';
import { Type } from '@sinclair/typebox';
import { Validate } from 'nestjs-typebox';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Validate({ response: Type.Array(TaskSchema) })
  @ApiOperation({ summary: 'Get all the tasks' })
  @ApiResponse({ status: 200, description: 'all tasks found' })
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task | null> {
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new Error('no task found');
    } else {
      return task;
    }
  }

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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() task: Task,
  ): Promise<Task | null> {
    return await this.taskService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.taskService.delete(id);
  }
}
