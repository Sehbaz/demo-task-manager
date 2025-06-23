import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, Task } from '../entities/entities';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './task.dto';
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
  async create(id: number, task: CreateTaskDto): Promise<Task> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });
    if (project) (task as any).project = project;
    const newTask = this.taskService.create(task);
    return await this.taskService.save(newTask);
  }

  // async create(
  //   projectId: number,
  //   taskDto: (typeof CreateTaskDto)['static'],
  // ): Promise<Task> {
  //   const project = await this.projectRepository.findOne({
  //     where: { id: projectId },
  //   });
  //   if (!project) throw new Error('Project not found');

  //   const newTask = this.taskService.create({ ...taskDto });
  //   return await this.taskService.save(newTask);
  // }

  // update project
  async update(id: number, task: Task): Promise<Task | null> {
    await this.taskService.update(id, task);
    return await this.taskService.findOne({ where: { id } });
  }

  // async update(
  //   id: number,
  //   taskDto: (typeof UpdateTaskDto)['statis'],
  // ): Promise<Task | null> {
  //   await this.taskService.update(id, { ...taskDto });
  //   return await this.taskService.findOne({ where: { id } });
  // }

  // delete project
  async delete(id: number): Promise<void> {
    await this.taskService.delete(id);
  }
}
