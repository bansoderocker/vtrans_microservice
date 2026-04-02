import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule, SqlDBModule } from './database';
import { VTransController, VTransModule } from './vtrans';
import { AuthController, AuthService } from './auth';

@Module({
  imports: [SqlDBModule, VTransModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
