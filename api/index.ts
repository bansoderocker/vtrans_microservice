// api/index.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

const express = require('express');
const cors = require('cors');

const server = express();
// server.use(cors());

server.use(
  cors({
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

let isInitialized = false;

export default async function handler(req: any, res: any) {
  if (!isInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
    isInitialized = true;
  }

  return server(req, res); // Delegate the request to the express instance
}
