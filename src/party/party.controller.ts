import { PartyService } from './party.service';
import { CreatePartyDto, UpdatePartyDto } from './dtos/response';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('party')
export class PartyController {
  constructor(private readonly service: PartyService) {}

  @Post('createParty')
  create(@Body() dto: CreatePartyDto) {
    return this.service.create(dto);
  }

  @Get('getParty')
  getParty() {
    return this.service.get();
  }

  @Put('update/:id')
  update(@Body() dto: UpdatePartyDto) {
    return this.service.update(dto);
  }
}
