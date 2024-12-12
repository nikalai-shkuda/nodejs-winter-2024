import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { IArtist } from './interfaces/artist.interface';

export class Artist implements IArtist {
  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ApiProperty({ example: true, description: 'Grammy' })
  readonly grammy: boolean;

  @ApiProperty({ example: 'Queen', description: 'Name' })
  readonly name: string;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
