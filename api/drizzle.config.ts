import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL! as string,
    //  url: 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
  verbose: true,
  strict: true,
});
