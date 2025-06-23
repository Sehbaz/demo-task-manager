import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureNestJsTypebox } from 'nestjs-typebox';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  configureNestJsTypebox();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
