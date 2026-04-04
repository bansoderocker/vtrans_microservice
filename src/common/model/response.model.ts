import { IProcedureResult, IRecordSet } from 'mssql';

export class DBResponse<T> implements IProcedureResult<T> {
  returnValue: any;
  recordsets: T extends any[]
    ? { [P in keyof T]: IRecordSet<T[P]> }
    : IRecordSet<T>[];
  recordset: IRecordSet<T extends any[] ? T[0] : T>;
  rowsAffected: number[];
  output: { [key: string]: any };
}

export class DBResponseType<T> implements IProcedureResult<T> {
  returnValue: any;
  recordsets: any;
  recordset: any;
  rowsAffected: number[];
  output: { [key: string]: any };
}
