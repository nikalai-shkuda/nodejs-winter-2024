import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { randomUUID } from 'src/common/constants';
import { IFavorites } from './interfaces/favorites.interface';
import { Album } from 'src/albums/albums.model';
import { Artist } from 'src/artists/artists.model';
import { Track } from 'src/tracks/tracks.model';

@Entity('favorites')
export class Favorites implements IFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: [randomUUID],
    description: 'Albums ID',
  })
  @ManyToMany(() => Album)
  @JoinTable({ name: 'favorites_albums' })
  albums: Album[];

  @ApiProperty({
    example: [randomUUID],
    description: 'Artists ID',
  })
  @ManyToMany(() => Artist)
  @JoinTable({ name: 'favorites_artists' })
  artists: Artist[];

  @ApiProperty({
    example: [randomUUID],
    description: 'Tracks ID',
  })
  @ManyToMany(() => Track)
  @JoinTable({ name: 'favorites_tracks' })
  tracks: Track[];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
