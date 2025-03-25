import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('School & Teacher API')
    .setDescription('APIs for managing schools and teachers')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      { type: 'apiKey', name: 'custom-header', in: 'header' }, 
      'custom-header'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      requestInterceptor: (req) => {
        req.headers['custom-header'] = 'my_secret_value';
        return req;
      }
    },
  });

  await app.listen(3000);
}
bootstrap();
