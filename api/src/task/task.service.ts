import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, Task } from '../entities/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskService: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  // all project
  async findAll(): Promise<Task[]> {
    return await this.taskService.find();
  }

  // project by id
  async findOne(id: number): Promise<Task | null> {
    return await this.taskService.findOne({
      where: { id },
    });
  }

  // create project
  async create(id: number, task: Task): Promise<Task> {
    console.log('id', id);
    console.log('task', task);
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });
    if (project) task.project = project;
    const newTask = this.taskService.create(task);
    return await this.taskService.save(newTask);
  }

  // delete project
  async delete(id: number): Promise<void> {
    console.log('-------', id);
    await this.taskService.delete(id);
  }

  // update project
  async update(id: number, task: Task): Promise<Task | null> {
    await this.taskService.update(id, task);
    return await this.taskService.findOne({ where: { id } });
  }
}
