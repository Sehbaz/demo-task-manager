import { Injectable, Inject } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task, CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepo: TaskRepository,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepo.findAll();
  }

  findAllByProjectId(projectId: number): Promise<Task[]> {
    return this.taskRepo.findAllByProjectId(projectId);
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepo.findOne(id);
  }

  create(task: CreateTaskDto): Promise<Task> {
    return this.taskRepo.create(task);
  }

  update(id: number, task: CreateTaskDto): Promise<Task | null> {
    return this.taskRepo.update(id, task);
  }

  delete(id: number): Promise<void> {
    return this.taskRepo.delete(id);
  }
}
