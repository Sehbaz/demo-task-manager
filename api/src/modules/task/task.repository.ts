import { Task, CreateTaskDto, UpdateTaskDto } from './task.dto';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findAllByProjectId(projectId: number): Promise<Task[]>;
  findOne(id: number): Promise<Task | null>;
  create(task: CreateTaskDto): Promise<Task>;
  update(id: number, task: UpdateTaskDto): Promise<Task | null>;
  delete(id: number): Promise<void>;
}
