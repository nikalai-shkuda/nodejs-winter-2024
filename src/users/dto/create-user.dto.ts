import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  errorMessages,
  maxLoginLength,
  maxPasswordLength,
  minLoginLength,
  minPasswordLength,
} from 'src/common/constants';

export class CreateUserDto {
  @ApiProperty({ example: 'example', description: 'Username' })
  @IsString()
  @IsNotEmpty({ message: errorMessages.SHOULD_NOT_BE_EMPTY })
  @Length(minLoginLength, maxLoginLength)
  readonly login: string;

  @ApiProperty({ example: 'qwert', description: 'Password' })
  @IsString()
  @IsNotEmpty({ message: errorMessages.SHOULD_NOT_BE_EMPTY })
  @Length(minPasswordLength, maxPasswordLength)
  readonly password: string;
}
