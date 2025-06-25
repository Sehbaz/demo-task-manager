import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import db from 'src/drizzle';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'DRIZZLE_DB',
      useValue: db,
    },
  ],
})
export class ProjectModule {}
