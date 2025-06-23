import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectService: Repository<Project>,
  ) {}

  // all project
  async findAll(): Promise<Project[]> {
    return await this.projectService.find({ relations: ['tasks'] });
  }

  // project by id
  async findOne(id: number): Promise<Project | null> {
    return await this.projectService.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  // create project
  async create(project: Project): Promise<Project> {
    const newProject = this.projectService.create(project);
    return await this.projectService.save(newProject);
  }

  // delete project
  async delete(id: number): Promise<void> {
    await this.projectService.delete(id);
  }

  // update project
  async update(id: number, project: Project): Promise<Project | null> {
    await this.projectService.update(id, project);
    return await this.projectService.findOne({ where: { id } });
  }
}
