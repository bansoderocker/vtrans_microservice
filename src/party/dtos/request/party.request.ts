// login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PartyRequest {
  @ApiProperty({
    example: 'EMAIL',
    type: String,
    description: 'party ids by comma seperate',
  })
  @IsOptional()
  partyIds: string;
}
