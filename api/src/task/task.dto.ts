import { Type, Static } from '@sinclair/typebox';
import { BaseProjectSchema } from 'src/shared/base.dto';

export const TaskSchema = Type.Object({
  id: Type.Number(),
  name: Type.String({ minLength: 1 }),
  projectId: Type.Number(),
  project: Type.Optional(BaseProjectSchema),
});

export const CreateTaskSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  projectId: Type.Number(),
});

export type Task = Static<typeof TaskSchema>;
export type CreateTaskDto = Static<typeof CreateTaskSchema>;
