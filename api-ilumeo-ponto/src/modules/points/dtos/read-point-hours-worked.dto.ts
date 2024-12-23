import { ApiProperty } from '@nestjs/swagger';

import { ReadWorkedDto } from './read-worked.dto';

export class ReadPointHoursWorkedDto {
  @ApiProperty({
    description: 'Registration date',
    type: String,
  })
  registrationDate: string;

  @ApiProperty({
    description: 'Hours worked',
    type: ReadWorkedDto,
  })
  hoursWorked: ReadWorkedDto;
}
