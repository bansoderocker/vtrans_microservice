import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule, SqlDBModule } from './database';
import { VTransController, VTransModule } from './vtrans';

@Module({
  imports: [SqlDBModule, VTransModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
