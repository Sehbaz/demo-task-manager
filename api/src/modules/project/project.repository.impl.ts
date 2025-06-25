import { eq } from 'drizzle-orm';
import { db } from '../../drizzle';
import { projects, tasks } from '../../drizzle/schema';
import { Project, CreateProjectDto } from './project.dto';
import { ProjectRepository } from './project.repository';

export class DrizzleProjectRepository implements ProjectRepository {
  clean(project: any): Project {
    return {
      ...project,
      description: project.description ?? '',
      tasks: project.tasks ?? [],
    };
  }

  async findAll(): Promise<Project[]> {
    const rows = await db
      .select()
      .from(projects)
      .leftJoin(tasks, eq(tasks.projectId, projects.id));

    // Group tasks by project
    const projectMap = new Map<number, Project>();
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
        const projectEntry = projectMap.get(proj.id);
        if (projectEntry?.tasks) {
          projectEntry.tasks.push(row.tasks);
        }
      }
    }
    return Array.from(projectMap.values());
  }

  async findOne(id: number): Promise<Project | null> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    if (!project) return null;
    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, id));
    return this.clean({ ...project, tasks: projectTasks });
  }

  async create(project: CreateProjectDto): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return this.clean({ ...newProject, tasks: [] });
  }

  async update(id: number, project: CreateProjectDto): Promise<Project | null> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    if (!updatedProject) return null;
    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, id));
    return this.clean({ ...updatedProject, tasks: projectTasks });
  }

  async delete(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
}
