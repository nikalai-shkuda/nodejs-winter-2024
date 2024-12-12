import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'Artist ID',
  })
  readonly artistId?: string | null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 2024, description: 'Year' })
  readonly year: number;
}
