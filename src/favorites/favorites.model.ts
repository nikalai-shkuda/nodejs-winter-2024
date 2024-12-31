import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'src/common/constants';
import { IFavorites } from './interfaces/favorites.interface';

export class Favorites implements IFavorites {
  @ApiProperty({
    example: [randomUUID],
    description: 'Albums ID',
  })
  readonly albums: string[] = [];

  @ApiProperty({
    example: [randomUUID],
    description: 'Artists ID',
  })
  readonly artists: string[] = [];

  @ApiProperty({
    example: [randomUUID],
    description: 'Tracks ID',
  })
  readonly tracks: string[] = [];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
