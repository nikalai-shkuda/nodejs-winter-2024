import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { randomUUID } from 'src/common/constants';
import { IAlbum } from './interfaces/album.interface';

export class Album implements IAlbum {
  @ApiProperty({
    example: randomUUID,
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ApiProperty({
    example: randomUUID,
    description: 'Artist ID',
  })
  readonly artistId?: string | null = null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 2024, description: 'Year' })
  readonly year: number;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
