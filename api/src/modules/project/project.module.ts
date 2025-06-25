import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DrizzleProjectRepository } from './project.repository.impl';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'ProjectRepository',
      useClass: DrizzleProjectRepository,
    },
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
