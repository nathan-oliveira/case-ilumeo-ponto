import { ApiProperty } from '@nestjs/swagger';

import { RecordTypeEnum } from '../enums/record-type.enum';

export class ReadInfoLastRecordDto {
  @ApiProperty({
    description: 'Registration date',
    type: String,
  })
  orderOfRegistration: number;

  @ApiProperty({
    description: 'Hours worked',
    type: 'string',
    enum: RecordTypeEnum,
  })
  recordType: string;
}
