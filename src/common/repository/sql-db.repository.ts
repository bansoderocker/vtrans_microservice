import { Injectable } from '@nestjs/common';
import { MssqlRequestInput, MssqlService } from '@strongnguyen/nestjs-mssql';

export const SQL = require('mssql');

@Injectable()
export class SQLDBRepository {
  constructor(public mssql: MssqlService) {}

  async ExecuteQuery<T>(sqlQuery: string, params?: MssqlRequestInput[]) {
    let req = this.mssql.getPool().request();

    if (params) {
      params.forEach((p) => (req = req.input(p.name, p.type, p.value)));
    }
    return (await req.query(sqlQuery)) as DBResponse<T>;
  }
}

import { IProcedureResult, IRecordSet } from 'mssql';

export class DBResponse<T> implements IProcedureResult<T> {
  returnValue!: any;

  recordsets!: T extends any[]
    ? { [P in keyof T]: IRecordSet<T[P]> }
    : IRecordSet<T>[];

  recordset!: IRecordSet<T extends any[] ? T[0] : T>;

  rowsAffected!: number[];

  output!: { [key: string]: any };
}
