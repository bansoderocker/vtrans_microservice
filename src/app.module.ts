import { Module } from '@nestjs/common';
import { SqlDBModule } from './database';
import { VTransModule } from './vtrans';
import { PartyModule } from './party/party.module';

@Module({
  imports: [SqlDBModule, VTransModule, PartyModule],
  // controllers: [AppController, AuthController, PartyController],
  // providers: [AppService, AuthService, PartyService],
})
export class AppModule {}
