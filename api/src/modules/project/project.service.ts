import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project, CreateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepo: ProjectRepository,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepo.findAll();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  create(dto: CreateProjectDto): Promise<Project> {
    return this.projectRepo.create(dto);
  }

  async update(id: number, dto: CreateProjectDto): Promise<Project> {
    const updated = await this.projectRepo.update(id, dto);
    if (!updated) throw new NotFoundException('Project not found');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.projectRepo.delete(id);
  }
}
