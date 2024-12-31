import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { errorMessages, minPasswordLength } from 'src/common/constants';

export class CreateUserDto {
  @ApiProperty({ example: 'example', description: 'Login' })
  @IsString()
  @IsNotEmpty({ message: errorMessages.SHOULD_NOT_BE_EMPTY })
  readonly login: string;

  @ApiProperty({ example: 'qwert', description: 'Password' })
  @IsString()
  @IsNotEmpty({ message: errorMessages.SHOULD_NOT_BE_EMPTY })
  @MinLength(minPasswordLength)
  readonly password: string;
}
