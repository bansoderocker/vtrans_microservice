// party.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Party } from './party.entity';
import { CreatePartyDto, UpdatePartyDto } from './dtos/response';
import { INTERFACES } from './constants';
import { IPartyRepository } from './interfaces';

@Injectable()
export class PartyService {
  constructor(
    @Inject(INTERFACES.IPARTYREPOSITORY)
    private repo: IPartyRepository,
  ) {}

  async create(dto: CreatePartyDto): Promise<boolean> {
    return this.repo.create(dto);
  }

  async get(): Promise<Party[]> {
    return await this.repo.get();
  }

  async update(dto: UpdatePartyDto): Promise<boolean> {
    const party = await this.update(dto);
    return party;
  }
}
