import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '../entities/entities';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // get all project
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  // get by id project
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Project | null> {
    const project = await this.projectService.findOne(id);
    if (!project) {
      throw new Error('no project found');
    } else {
      return project;
    }
  }

  // create project
  @Post()
  async create(@Body() project: Project): Promise<Project> {
    return await this.projectService.create(project);
  }

  // update project
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() project: Project,
  ): Promise<Project | null> {
    return await this.projectService.update(id, project);
  }

  // delte project
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.projectService.delete(id);
  }
}
