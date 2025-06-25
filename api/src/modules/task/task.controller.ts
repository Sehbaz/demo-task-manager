import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all tasks for a project' })
  @ApiResponse({ status: 200, description: 'List of tasks.' })
  async findAllForProject(@Param('projectId', ParseIntPipe) projectId: number) {
    const tasks = await this.taskService.findAllByProjectId(projectId);
    if (!tasks) throw new NotFoundException('Project or tasks not found');
    return tasks;
  }

  @Post('project/:projectId')
  @ApiOperation({ summary: 'Create a new task for a project' })
  @ApiResponse({ status: 201, description: 'Task created.' })
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateTaskDto,
  ) {
    const task = await this.taskService.create(dto);
    return task;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiResponse({ status: 204, description: 'Task deleted.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.delete(id);
    return { success: true };
  }
}
