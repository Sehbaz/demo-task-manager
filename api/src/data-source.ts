// src/data-source.ts
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any, // ✅ fixed
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD, // ✅ fix spelling
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/entities/entities.{ts,js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});
