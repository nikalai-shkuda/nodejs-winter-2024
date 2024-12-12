import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'qwert', description: 'Previous password' })
  readonly oldPassword: string;

  @ApiProperty({ example: 'qwert', description: 'New password' })
  readonly newPassword: string;
}
