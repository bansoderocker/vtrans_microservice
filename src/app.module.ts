import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule, SqlDBModule } from './database';
import { VTransController, VTransModule } from './vtrans';
import { AuthController, AuthService } from './auth';
import { PartyModule } from 'party/party.module';
import { PartyService } from 'party/party.service';
import { PartyController } from 'party/party.controller';

@Module({
  imports: [SqlDBModule, VTransModule, PartyModule],
  // controllers: [AppController, AuthController, PartyController],
  // providers: [AppService, AuthService, PartyService],
})
export class AppModule {}
