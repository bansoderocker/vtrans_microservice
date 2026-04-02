// login.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: 'EMAIL',
    description: 'Login method: EMAIL or GOOGLE',
  })
  provider: 'EMAIL' | 'GOOGLE';

  @ApiPropertyOptional({ example: 'test@gmail.com' })
  email?: string;

  @ApiPropertyOptional({ example: '12345678' })
  password?: string;

  @ApiPropertyOptional({
    description: 'Firebase Google ID Token (required for GOOGLE login)',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...',
  })
  idToken?: string;
}
