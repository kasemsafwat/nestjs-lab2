import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { CustomHeaderMiddleware } from 'src/middlewares/custom-header.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomHeaderMiddleware).forRoutes(TeachersController);
  }
}
