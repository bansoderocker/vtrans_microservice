import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginRequest } from 'src/dtos/request';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginRequest })
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Firebase ID Token' })
  @ApiBody({
    schema: {
      example: {
        refreshToken: 'your_refresh_token_here',
      },
    },
  })
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshFirebaseToken(body.refreshToken);
  }
}
