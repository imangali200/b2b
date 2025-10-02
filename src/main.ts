import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'*',
    methods:'GET,POST,DELETE,PUT,PATCH',
  })
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('b2b adminka')
    .setVersion('1.0')
    .addTag('App')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api-docs',app,document)
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
