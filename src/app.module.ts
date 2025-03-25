import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TeachersModule } from './modules/Teachers/teachers.module';
import { SchoolsModule } from './modules/Schools/schools.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomHeaderMiddleware } from './middlewares/custom-header.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TeachersModule, SchoolsModule, AuthModule,ConfigModule.forRoot({ isGlobal: true }), ],
  exports: [ConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomHeaderMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/signin', method: RequestMethod.POST }
      )
      .forRoutes('*');
  }
}