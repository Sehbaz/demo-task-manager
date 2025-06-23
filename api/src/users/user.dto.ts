import { Type, Static } from '@sinclair/typebox';

export const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String(),
});

export const CreateUserSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
});

export type User = Static<typeof UserSchema>;
export type CreateUserDto = Static<typeof CreateUserSchema>;
