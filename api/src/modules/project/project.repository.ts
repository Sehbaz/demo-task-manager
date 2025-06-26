import { Project, CreateProjectDto, UpdateProjectDto } from './project.dto';

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findOne(id: number): Promise<Project | null>;
  create(project: CreateProjectDto): Promise<Project>;
  update(id: number, project: UpdateProjectDto): Promise<Project | null>;
  delete(id: number): Promise<void>;
}
