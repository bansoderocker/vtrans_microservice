import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT ?? 3000);
  } else {
    await app.init(); // Do NOT call app.listen() for Vercel
  }
}
bootstrap();
