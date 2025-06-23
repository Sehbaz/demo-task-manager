import { Type, Static } from '@sinclair/typebox';

export const ProjectSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export const CreateTaskSchema = Type.Object({
  title: Type.String({
    minLength: 1,
  }),
  projectId: Type.Number(), // for creation, reference by id
});

export const TaskSchema = Type.Intersect([
  Type.Object({ id: Type.Number() }),
  Type.Object({
    title: Type.String({ minLength: 1 }),
    project: ProjectSchema, // full project object in response
  }),
]);

export type Task = Static<typeof TaskSchema>;
export type CreateTaskDto = Static<typeof CreateTaskSchema>;
