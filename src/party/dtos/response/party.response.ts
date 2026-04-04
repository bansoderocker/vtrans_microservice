// party.dto.ts
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePartyDto {
  @ApiProperty({ example: 'ABC Traders' })
  @IsString()
  PartyName: string;

  @ApiPropertyOptional({ example: 'Mumbai, India' })
  @IsOptional()
  @IsString()
  Address?: string;

  @ApiPropertyOptional({ example: 'abc@gmail.com' })
  @IsOptional()
  @IsEmail()
  Email?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsOptional()
  @IsString()
  WhatsappNumber?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  ContactPerson?: string;

  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  CreatedBy?: string;
}

export class UpdatePartyDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  PartyId: number;

  @ApiPropertyOptional({ example: 'ABC Traders' })
  @IsOptional()
  @IsString()
  PartyName?: string;

  @ApiPropertyOptional({ example: 'Mumbai, India' })
  @IsOptional()
  @IsString()
  Address?: string;

  @ApiPropertyOptional({ example: 'abc@gmail.com' })
  @IsOptional()
  @IsEmail()
  Email?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsOptional()
  @IsString()
  WhatsappNumber?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  ContactPerson?: string;

  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  UpdatedBy?: string;
}
