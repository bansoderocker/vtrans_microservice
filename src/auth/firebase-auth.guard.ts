// src/auth/firebase-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { firebase_admin } from './firebase';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    try {
      // if (firebase_admin) {
      const decodedToken = await firebase_admin.auth().verifyIdToken(token);
      req['user'] = decodedToken; // attach decoded info to request
      req['accessToken'] = token;
      return true;
      // } else {
      //   admin.initializeApp({
      //     credential: admin.credential.cert({
      //       projectId: process.env.FIREBASE_PROJECT_ID,
      //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      //       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      //     }),
      //   });
      //   const decodedToken = await admin.auth().verifyIdToken(token);
      //   req['user'] = decodedToken; // attach decoded info to request
      //   return true;
      // }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }
}
