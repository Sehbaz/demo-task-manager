import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';

import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { projects, tasks } from 'src/drizzle/schema';
@Injectable()
export class TaskService {
  async findAll() {
    return await db.select().from(tasks);
  }

  async findOne(id: number) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));

    return task;
  }

  async create(id: number, task: CreateTaskDto) {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }

  async update(id: number, task: CreateTaskDto) {
    const [updatedTask] = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();
    return updatedTask;
  }

  async delete(id: number) {
    await db.delete(tasks).where(eq(tasks.id, id));
  }
}
