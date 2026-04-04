import { Injectable } from '@nestjs/common';
import { SQLDBRepository } from '/common/repository';
import { IPartyRepository } from '../interfaces/party.interface';
import { CreatePartyDto, UpdatePartyDto } from '../dtos/response';
import { Party } from '../party.entity';
import { MssqlRequestInput } from '@strongnguyen/nestjs-mssql';
import { Int, VarChar } from 'mssql';

@Injectable()
export class PartyRepository implements IPartyRepository {
  constructor(private db: SQLDBRepository) {}

  async get(): Promise<Party[]> {
    let strQry = `select PartyId,PartyName,Address,Email,WhatsappNumber,ContactPerson,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn,RowGuid FROM tblParty`;
    let strWhere = '';
    const result = await this.db.ExecuteQuery(strQry);
    return result.recordset as Party[];
  }

  async create(request: CreatePartyDto): Promise<boolean> {
    let strQry = ` INSERT INTO [tblParty] ([PartyName] ,[Address] ,[Email] ,[WhatsappNumber] ,[ContactPerson] ,[CreatedBy] ,[CreatedOn],[RowGuid])
     VALUES (@PartyName ,@Address ,@Email ,@WhatsappNumber ,@ContactPerson ,@CreatedBy ,getDate(),NEWID()) `;

    if (request) {
      let parameters: MssqlRequestInput[] = [];

      parameters.push({
        name: 'PartyName',
        type: VarChar,
        value: request.PartyName,
      });

      parameters.push({
        name: 'Address',
        type: VarChar,
        value: request.Address,
      });

      parameters.push({
        name: 'Email',
        type: VarChar,
        value: request.Email,
      });

      parameters.push({
        name: 'WhatsappNumber',
        type: VarChar,
        value: request.WhatsappNumber,
      });

      parameters.push({
        name: 'ContactPerson',
        type: VarChar,
        value: request.ContactPerson ?? '',
      });

      parameters.push({
        name: 'CreatedBy',
        type: VarChar,
        value: request.CreatedBy,
      });

      const result = await this.db.ExecuteQuery(strQry, parameters);
      if (result && result.rowsAffected && result.rowsAffected.length > 0) {
        return result.rowsAffected[0] === 1;
      } else {
        return false;
      }
    }
    return null;
  }

  async update(request: UpdatePartyDto): Promise<boolean> {
    let strQry = ` Update [tblParty] set
     [PartyName] = @PartyName,
     [Address] = @Address ,
     [Email] = @Email ,
     [WhatsappNumber] = @WhatsappNumber,
     [ContactPerson] = @ContactPerson,
     UpdatedBy = @UpdatedBy,
     UpdatedOn = GETDATE()
     Where PartyId = @PartyId
     `;

    if (request) {
      let parameters: MssqlRequestInput[] = [];

      parameters.push({
        name: 'PartyId',
        type: Int,
        value: request.PartyId,
      });

      parameters.push({
        name: 'PartyName',
        type: VarChar,
        value: request.PartyName,
      });

      parameters.push({
        name: 'Address',
        type: VarChar,
        value: request.Address,
      });

      parameters.push({
        name: 'Email',
        type: VarChar,
        value: request.Email,
      });

      parameters.push({
        name: 'WhatsappNumber',
        type: VarChar,
        value: request.WhatsappNumber,
      });

      parameters.push({
        name: 'ContactPerson',
        type: VarChar,
        value: request.ContactPerson ?? '',
      });

      parameters.push({
        name: 'UpdatedBy',
        type: VarChar,
        value: request.UpdatedBy,
      });

      const result = await this.db.ExecuteQuery(strQry, parameters);
      if (result && result.rowsAffected && result.rowsAffected.length > 0) {
        return result.rowsAffected[0] === 1;
      } else {
        return false;
      }
    }
  }
}
