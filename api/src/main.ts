import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureNestJsTypebox } from 'nestjs-typebox';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async (): Promise<void> => {
  configureNestJsTypebox();

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

  const port = process.env.PORT || 3000;
  await app.listen(port);
};

bootstrap();
