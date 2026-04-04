// party.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tblParty')
export class Party {
  @PrimaryGeneratedColumn()
  PartyId: number;

  @Column({ length: 100 })
  PartyName: string;

  @Column({ length: 200, nullable: true })
  Address: string;

  @Column({ length: 100, unique: true, nullable: true })
  Email: string;
  

  @Column({ length: 50, nullable: true })
  WhatsappNumber: string;

  @Column({ length: 100, nullable: true })
  ContactPerson: string;

  @Column({ length: 50, nullable: true })
  CreatedBy: string;

  @CreateDateColumn({ type: 'datetime' })
  CreatedOn: Date;

  @Column({ length: 50, nullable: true })
  UpdatedBy: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  UpdatedOn: Date;

  @Column({ type: 'uniqueidentifier', default: () => 'NEWID()' })
  RowGuid: string;
}
