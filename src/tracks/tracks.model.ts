import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { ITrack } from './interfaces/track.interface';

export class Track implements ITrack {
  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'Album ID',
  })
  readonly albumId?: string | null = null;

  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'Artist ID',
  })
  readonly artistId?: string | null = null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 300, description: 'Duration' })
  readonly duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
