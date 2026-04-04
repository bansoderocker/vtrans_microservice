// party.module.ts
import { Module } from '@nestjs/common';
import { PartyService } from './party.service';
import { PartyController } from './party.controller';
import { INTERFACES } from './constants';
import { PartyRepository } from './repositories';
import { SqlDBModule } from '../database';
import { SQLDBRepository } from '../common/repository';

@Module({
  imports: [SqlDBModule],
  providers: [
    SQLDBRepository,
    PartyRepository,
    PartyService,
    { provide: INTERFACES.IPARTYREPOSITORY, useClass: PartyRepository },
  ],
  controllers: [PartyController],
})
export class PartyModule {}
