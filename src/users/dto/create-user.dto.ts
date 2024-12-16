import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { minPasswordLength } from 'src/common/constants';

export class CreateUserDto {
  @ApiProperty({ example: 'example', description: 'Login' })
  @IsString()
  readonly login: string;

  @ApiProperty({ example: 'qwert', description: 'Password' })
  @IsString()
  @MinLength(minPasswordLength)
  readonly password: string;
}
