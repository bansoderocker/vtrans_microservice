import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { VTransService } from './vtrans.service';
import { FirebaseAuthGuard } from '../auth';

@Controller()
export class VTransController {
  constructor(private readonly service: VTransService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('getBillList')
  async getBillList(@Req() req: Request): Promise<any> {
    const token = req['accessToken'];
    return await this.service.getBillList(token);
  }
}
