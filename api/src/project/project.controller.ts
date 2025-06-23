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
import { CreateProjectDto, Project } from './project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Project | null> {
    const project = await this.projectService.findOne(id);
    if (!project) {
      throw new Error('no project found');
    } else {
      return project;
    }
  }

  @Post()
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProjectDto,
  ): Promise<Project | null> {
    const updated = await this.projectService.update(id, dto);
    if (!updated) {
      throw new Error('no project found');
    }
    return updated;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.projectService.delete(id);
  }
}
