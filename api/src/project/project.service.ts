import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { projects, tasks } from 'src/drizzle/schema';
import { CreateProjectDto, Project } from './project.dto';

@Injectable()
export class ProjectService {
  normalizeProject(project: any | null): Project | null {
    if (!project) return null;
    return {
      ...project,
      description: project.description ?? '',
    };
  }

  async findAll() {
    const rows = await db
      .select()
      .from(projects)
      .leftJoin(tasks, eq(tasks.projectId, projects.id));

    // Group tasks by project
    const projectMap = new Map<
      number,
      { id: number; title: string; description: string; tasks: any[] }
    >();
    for (const row of rows) {
      const proj = row.projects;
      if (!projectMap.has(proj.id)) {
        projectMap.set(proj.id, {
          id: proj.id,
          title: proj.title,
          description: proj.description ?? '',
          tasks: [],
        });
      }
      if (row.tasks) {
        projectMap.get(proj.id)!.tasks.push(row.tasks);
      }
    }
    return Array.from(projectMap.values());
  }

  async findOne(id: number) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    if (!project) return null;

    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, id));

    return this.normalizeProject({
      ...project,
      tasks: projectTasks,
    });
  }

  async create(project: CreateProjectDto) {
    const [newProject] = await db.insert(projects).values(project).returning();
    return this.normalizeProject(newProject);
  }

  async delete(id: number) {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async update(id: number, project: CreateProjectDto) {
    const [udpatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return this.normalizeProject(udpatedProject);
  }
}
