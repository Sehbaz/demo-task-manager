import { Type, Static } from '@sinclair/typebox';
import { BaseProjectSchema } from 'src/shared/base.dto';

export const TaskSchema = Type.Object({
  id: Type.Number(),
  title: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  status: Type.Union([
    Type.Literal('todo'),
    Type.Literal('in_progress'),
    Type.Literal('done'),
  ]),
  priority: Type.Union([
    Type.Literal('low'),
    Type.Literal('medium'),
    Type.Literal('high'),
  ]),
  projectId: Type.Number(),
  project: Type.Optional(BaseProjectSchema),
});

export const CreateTaskSchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  status: Type.Optional(
    Type.Union([
      Type.Literal('todo'),
      Type.Literal('in_progress'),
      Type.Literal('done'),
    ]),
  ),
  priority: Type.Optional(
    Type.Union([
      Type.Literal('low'),
      Type.Literal('medium'),
      Type.Literal('high'),
    ]),
  ),
  projectId: Type.Number(),
});

export type Task = Static<typeof TaskSchema>;
export type CreateTaskDto = Static<typeof CreateTaskSchema>;
