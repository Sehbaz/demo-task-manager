import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';
import * as schema from './schema';
export const conenction = postgres(process.env.DATABASE_URL! as string, {
  max: 1,
});

export const db = drizzle(conenction, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
