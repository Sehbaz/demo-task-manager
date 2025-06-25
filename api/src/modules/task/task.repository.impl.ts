// src/modules/task/task.repository.impl.ts
import { eq } from 'drizzle-orm';
import { db } from '../../drizzle';
import { tasks } from '../../drizzle/schema';
import { CreateTaskDto, Task } from './task.dto';
import { TaskRepository } from './task.repository';

export class DrizzleTaskRepository implements TaskRepository {
  clean(task: any): Task {
    return {
      ...task,
      description: task.description ?? undefined,
      status: task.status ?? undefined,
      priority: task.priority ?? undefined,
    };
  }

  async findAll(): Promise<Task[]> {
    const result = await db.select().from(tasks);
    return result.map(this.clean);
  }

  async findAllByProjectId(projectId: number): Promise<Task[]> {
    const result = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId));
    return result.map(this.clean);
  }

  async findOne(id: number): Promise<Task | null> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task ? this.clean(task) : null;
  }

  async create(task: CreateTaskDto): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return this.clean(newTask);
  }

  async update(id: number, task: CreateTaskDto): Promise<Task | null> {
    const [updated] = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();
    return updated ? this.clean(updated) : null;
  }

  async delete(id: number): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }
}
