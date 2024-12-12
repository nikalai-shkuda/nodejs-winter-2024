import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'Album ID',
  })
  readonly albumId?: string | null;

  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'Artist ID',
  })
  readonly artistId?: string | null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 300, description: 'Duration' })
  readonly duration: number;
}
