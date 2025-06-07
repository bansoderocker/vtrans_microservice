import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MssqlModule } from '@strongnguyen/nestjs-mssql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MssqlModule.register({
      server: process.env.SERVER_NAME!,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      options: {
        encrypt: false,
        requestTimeout: 60000,
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [MssqlModule],
})
export class SqlDBModule {}
