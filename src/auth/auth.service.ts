import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { firebase_admin, firebase_app } from './firebase';
import axios from 'axios';
import { LoginRequest } from 'src/dtos/request';

@Injectable()
export class AuthService {
  private auth: Auth;
  private firebaseApiKey = process.env.FIREBASE_API_KEY;

  constructor() {
    const firebaseApp = firebase_app;
    this.auth = getAuth(firebaseApp);
  }

  async login(body: LoginRequest) {
    try {
      // ✅ EMAIL LOGIN
      if (body.provider === 'EMAIL') {
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          body.email!,
          body.password!,
        );

        const user = userCredential.user;

        return {
          uid: user.uid,
          email: user.email,
          idToken: await user.getIdToken(),
          refreshToken: user.refreshToken,
        };
      }

      // ✅ GOOGLE LOGIN
      if (body.provider === 'GOOGLE') {
        // ⚠️ You should verify token using Firebase Admin SDK
        // (best practice)

        const decodedToken = await firebase_admin
          .auth()
          .verifyIdToken(body.idToken!);

        return {
          uid: decodedToken.uid,
          email: decodedToken.email,
          idToken: body.idToken,
          body,
        };
      }

      throw new UnauthorizedException('Invalid provider');
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  //   /**
  //    * Login user using email & password
  //    */
  //   async login(email: string, password: string) {
  //     try {
  //       const userCredential = await signInWithEmailAndPassword(
  //         this.auth,
  //         email,
  //         password,
  //       );

  //       const user = userCredential.user;

  //       // 🔥 Firebase ID Token
  //       const idToken = await user.getIdToken();

  //       return {
  //         uid: user.uid,
  //         email: user.email,
  //         idToken,
  //       };
  //     } catch (error) {
  //       throw new UnauthorizedException('Invalid email or password' + error);
  //     }
  //   }

  /**
   * Get fresh token (force refresh)
   */
  async refreshToken(user: any) {
    try {
      const idToken = await user.getIdToken(true);
      return { idToken };
    } catch (error) {
      throw new UnauthorizedException('Token refresh failed');
    }
  }

  async refreshFirebaseToken(refreshToken: string) {
    try {
      const response = await this.callFirebaseRefreshApi(refreshToken);
      return {
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };
    } catch (error: any) {
      throw new UnauthorizedException(
        error?.response?.data || 'Token refresh failed',
      );
    }
  }

  private async callFirebaseRefreshApi(refreshToken: string) {
    const url = `https://securetoken.googleapis.com/v1/token?key=${this.firebaseApiKey}`;

    return axios.post(url, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
  }
}
