import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { errorMessages, tokenExample } from 'src/common/constants';

export class CreateRefreshTokenDto {
  @ApiProperty({
    example: tokenExample,
    description: 'Refresh token',
  })
  @IsJWT()
  @IsString()
  @IsNotEmpty({ message: errorMessages.SHOULD_NOT_BE_EMPTY })
  refreshToken: string;
}
