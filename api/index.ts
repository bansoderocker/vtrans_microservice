import { VercelApiHandler } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
let cachedHandler: VercelApiHandler;

async function bootstrap(): Promise<VercelApiHandler> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  return (req, res) => server(req, res);
}

const handler: VercelApiHandler = async (req, res) => {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
};

export default handler;
