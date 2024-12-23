import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryParamsDto {
  @ApiProperty({
    name: 'userCode',
    description: 'Filter query parameter for table',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'User code cannot be empty!' })
  @IsString({ message: 'User code must be a string!' })
  userCode: string;
}
