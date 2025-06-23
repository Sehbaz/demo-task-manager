import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureNestJsTypebox } from 'nestjs-typebox';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // or whatever port your React app runs on
    credentials: true, // if you're using cookies
  });

  configureNestJsTypebox();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
