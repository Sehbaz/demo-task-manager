import { Project, CreateProjectDto } from './project.dto';

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findOne(id: number): Promise<Project | null>;
  create(project: CreateProjectDto): Promise<Project>;
  update(id: number, project: CreateProjectDto): Promise<Project | null>;
  delete(id: number): Promise<void>;
}
