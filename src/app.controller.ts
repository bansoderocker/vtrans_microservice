import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DimensionResponse } from './dtos/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('getDimension')
  getDimension(): Promise<DimensionResponse[]> {
    return this.appService.getDimension();
  }
}
