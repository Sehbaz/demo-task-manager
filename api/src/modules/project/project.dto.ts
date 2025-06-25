import { Type, Static } from '@sinclair/typebox';
import { BaseTaskSchema } from 'src/shared/base.dto';

export const ProjectSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  tasks: Type.Optional(Type.Array(BaseTaskSchema)),
});

export const CreateProjectSchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  description: Type.String(),
});

export type Project = Static<typeof ProjectSchema>;
export type CreateProjectDto = Static<typeof CreateProjectSchema>;
