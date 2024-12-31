import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: true, description: 'Grammy' })
  @IsBoolean()
  readonly grammy: boolean;

  @ApiProperty({ example: 'Queen', description: 'Name' })
  @IsString()
  readonly name: string;
}
