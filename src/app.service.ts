import { Injectable, NotFoundException } from '@nestjs/common';
import sql = require('mssql');
import { DimensionResponse } from './dtos/response';
import { MssqlService } from '@strongnguyen/nestjs-mssql';

@Injectable()
export class AppService {
  constructor(private mssql: MssqlService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDimension(): Promise<DimensionResponse[]> {
    const result = (
      await this.mssql
        .getPool()
        .query(
          `select DimensionId,	DimensionTypeId,	DimensionValue,	IsActive from dbo.Mst_Dimension`,
        )
    ).recordset;
    return result;
  }
}
