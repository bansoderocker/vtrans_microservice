import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('VTrans API')
    .setDescription('API documentation for VTrans microservice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT ?? 3000);
  } else {
    await app.init(); // Do NOT call app.listen() for Vercel
  }
}
bootstrap();
