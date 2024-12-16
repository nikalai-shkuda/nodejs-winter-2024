import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { randomUUID } from 'src/common/constants';
import { IArtist } from './interfaces/artist.interface';

export class Artist implements IArtist {
  @ApiProperty({
    example: randomUUID,
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
