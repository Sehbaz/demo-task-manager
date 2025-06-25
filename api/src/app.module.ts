import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProjectModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
