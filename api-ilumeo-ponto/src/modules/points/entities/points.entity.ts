import { Entity, Column } from 'typeorm';

import { AppEntity } from 'src/common/base/app.entity';
import { RecordTypeEnum } from '../enums/record-type.enum';

@Entity('pointRecords')
export class PointEntity extends AppEntity {
  @Column()
  userCode: string;

  @Column()
  registrationDate: Date;

  @Column({ enum: RecordTypeEnum })
  recordType: string;

  @Column()
  orderOfRegistration: number;
}
