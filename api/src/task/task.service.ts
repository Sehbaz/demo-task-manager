import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';

import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { projects, tasks } from 'src/drizzle/schema';
@Injectable()
export class TaskService {
  cleanTask(task: any) {
    return {
      ...task,
      description: task.description ?? undefined,
      status: task.status ?? undefined,
      priority: task.priority ?? undefined,
    };
  }

  async findAll() {
    const allTask = await db.select().from(tasks);
    return allTask.map(this.cleanTask);
  }

  async findOne(id: number) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));

    return task ? this.cleanTask(task) : null;
  }

  async create(id: number, task: CreateTaskDto) {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask ? this.cleanTask(newTask) : null;
  }

  async update(id: number, task: CreateTaskDto) {
    const [updatedTask] = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();
    return updatedTask ? this.cleanTask(updatedTask) : null;
  }

  async delete(id: number) {
    await db.delete(tasks).where(eq(tasks.id, id));
  }
}
