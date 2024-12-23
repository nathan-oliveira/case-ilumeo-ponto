import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterPointDto {
  @ApiProperty({
    type: String,
    description: 'Field for user code',
  })
  @IsNotEmpty({ message: 'User code cannot be empty!' })
  @MaxLength(20, {
    message: 'User code must contain a maximum of 20 characters!',
  })
  @IsString({ message: 'User code must be a string' })
  userCode: string;
}
