import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDBModule } from './database/sql.module';

@Module({
  imports: [SqlDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
