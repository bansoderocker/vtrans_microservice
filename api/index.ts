// api/index.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import * as express from 'express';

const server = express();
let isInitialized = false;

export default async function handler(req: any, res: any) {
  if (!isInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
    isInitialized = true;
  }

  return server(req, res); // Delegate the request to the express instance
}
