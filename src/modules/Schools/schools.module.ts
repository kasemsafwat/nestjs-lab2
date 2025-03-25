import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { CustomHeaderMiddleware } from 'src/middlewares/custom-header.middleware';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomHeaderMiddleware).forRoutes(SchoolsController);
  }
}