import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { randomUUID } from 'src/common/constants';
import { ITrack } from './interfaces/track.interface';

export class Track implements ITrack {
  @ApiProperty({
    example: randomUUID,
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ApiProperty({
    example: randomUUID,
    description: 'Album ID',
  })
  readonly albumId?: string | null = null;

  @ApiProperty({
    example: randomUUID,
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
