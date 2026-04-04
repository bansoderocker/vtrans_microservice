// party.module.ts
import { Module } from '@nestjs/common';
import { PartyService } from './party.service';
import { PartyController } from './party.controller';
import { SqlDBModule } from '/database';
import { INTERFACES } from './constants';
import { PartyRepository } from './repositories';
import { SQLDBRepository } from 'common/repository';

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
