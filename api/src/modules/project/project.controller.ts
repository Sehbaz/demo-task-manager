import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, Project } from './project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Project | null> {
    const project = await this.projectService.findOne(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  @Post()
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    const project = await this.projectService.create(dto);
    if (!project) throw new NotFoundException('Project could not be created');
    return project;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProjectDto,
  ): Promise<Project> {
    const updated = await this.projectService.update(id, dto);
    if (!updated) throw new NotFoundException('Project not found');
    return updated;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.projectService.delete(id);
  }
}
