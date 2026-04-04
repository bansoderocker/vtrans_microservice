import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/database';

@Injectable()
export class VTransService {
  constructor(private db: FirebaseService) {}

  async getBillList(token: string): Promise<any> {
    const url = this.db.getDatabase().ref('wallet/bills');
    const response = await fetch(`${url}.json?auth=${token}`);

    const data = await response.json();
    console.log(data);
    return data;
  }
}
