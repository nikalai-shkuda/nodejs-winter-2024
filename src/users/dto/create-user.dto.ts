import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example', description: 'Login' })
  readonly login: string;

  @ApiProperty({ example: 'qwert', description: 'Password' })
  readonly password: string;
}
