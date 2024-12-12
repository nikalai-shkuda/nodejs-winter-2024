import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty({ example: true, description: 'Grammy' })
  readonly grammy: boolean;

  @ApiProperty({ example: 'Queen', description: 'Name' })
  readonly name: string;
}
