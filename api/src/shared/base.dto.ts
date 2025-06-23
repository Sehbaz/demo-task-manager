import { Type, Static } from '@sinclair/typebox';

export const BaseProjectSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export const BaseTaskSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  projectId: Type.Number(),
});

export type BaseProject = Static<typeof BaseProjectSchema>;
export type BaseTask = Static<typeof BaseTaskSchema>;
