import { UnauthorizedException } from '@nestjs/common';

export const getTokenByRequest = (req: any) => {
  console.log('req', req);
  const authHeader = req.headers['authorization'];

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('No or malformed Authorization header');
  }

  return authHeader.split(' ')[1];
};

