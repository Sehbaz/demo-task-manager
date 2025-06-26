import { Type, Static } from '@sinclair/typebox';

export const ProjectSchema = Type.Object({
  id: Type.Number(),
  title: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
  tasks: Type.Optional(Type.Array(Type.Any())),
});

export const CreateProjectSchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  description: Type.Optional(Type.String()),
});

export type Project = Static<typeof ProjectSchema>;
export type CreateProjectDto = Static<typeof CreateProjectSchema>;

export const UpdateProjectSchema = Type.Partial(CreateProjectSchema);
export type UpdateProjectDto = Static<typeof UpdateProjectSchema>;
