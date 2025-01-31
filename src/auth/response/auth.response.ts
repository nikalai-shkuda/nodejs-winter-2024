import { ApiProperty } from '@nestjs/swagger';
import { randomUUID, tokenExample } from 'src/common/constants';

export class AuthResponse {
  @ApiProperty({
    example: tokenExample,
    description: 'Access token',
  })
  readonly accessToken: string;

  @ApiProperty({
    example: tokenExample,
    description: 'Refresh token',
  })
  readonly refreshToken: string;

  @ApiProperty({
    example: randomUUID,
    description: 'User ID',
  })
  readonly id: string;
}
