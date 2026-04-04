import { CreatePartyDto, UpdatePartyDto } from '../dtos/response';
import { Party } from '../party.entity';

export interface IPartyRepository {
  create(dto: CreatePartyDto): Promise<boolean>;

  get(): Promise<Party[]>;

  update(dto: UpdatePartyDto): Promise<boolean>;
}
