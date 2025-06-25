import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1024 }),
  status: varchar('status', { length: 32 }).default('todo'),
  priority: varchar('priority', { length: 16 }).default('medium'),
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, {
      onDelete: 'cascade',
    }),
});
