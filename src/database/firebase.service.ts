// src/firebase/firebase.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { Database } from 'firebase-admin/database';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;

  onModuleInit() {
    // Initialize only once
    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.applicationDefault(), // or use cert
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    }
  }

  // Annotate return type explicitly
  getAuth = (): Auth => {
    return admin.auth();
  };

  getFirestore() {
    return admin.firestore();
  }

  getDatabase = (): Database => {
    return admin.database();
  };
}
