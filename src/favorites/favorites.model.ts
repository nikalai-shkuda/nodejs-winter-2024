import { ApiProperty } from '@nestjs/swagger';
import { IFavorites } from './interfaces/favorites.interface';

export class Favorites implements IFavorites {
  @ApiProperty({
    example: ['1eb16247-1f1b-4a69-a48b-9b44db773516'],
    description: 'Albums ID',
  })
  readonly albums: string[] = [];

  @ApiProperty({
    example: ['1eb16247-1f1b-4a69-a48b-9b44db773516'],
    description: 'Artists ID',
  })
  readonly artists: string[] = [];

  @ApiProperty({
    example: ['1eb16247-1f1b-4a69-a48b-9b44db773516'],
    description: 'Tracks ID',
  })
  readonly tracks: string[] = [];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
