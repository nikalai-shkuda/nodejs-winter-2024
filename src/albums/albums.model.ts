import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { IAlbum } from './interfaces/album.interface';

export class Album implements IAlbum {
  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
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
