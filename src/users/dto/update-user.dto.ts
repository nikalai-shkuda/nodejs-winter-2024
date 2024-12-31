import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { minPasswordLength } from 'src/common/constants';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'qwert', description: 'Previous password' })
  @IsString()
  @MinLength(minPasswordLength)
  readonly oldPassword: string;

  @ApiProperty({ example: 'qwert', description: 'New password' })
  @IsString()
  @MinLength(minPasswordLength)
  readonly newPassword: string;
}
