// src/vtrans/vtrans.module.ts
import { Module } from '@nestjs/common';
import { VTransService } from './vtrans.service';
import { VTransController } from './vtrans.controller';
import { FirebaseModule } from 'src/database';

@Module({
  imports: [FirebaseModule],
  controllers: [VTransController],
  providers: [VTransService],
  exports: [VTransService], // Needed if used outside this module
})
export class VTransModule {}
