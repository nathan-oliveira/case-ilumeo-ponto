import { ApiProperty } from '@nestjs/swagger';

export class ReadWorkedDto {
  @ApiProperty({
    description: 'Hours worked',
    type: Number,
  })
  hours: number;

  @ApiProperty({
    description: 'Minutes worked',
    type: Number,
  })
  minutes: number;

  @ApiProperty({
    description: 'Seconds worked',
    type: Number,
  })
  seconds: number;

  @ApiProperty({
    description: 'Seconds worked',
    type: String,
  })
  lastRecordType?: string;
}
