import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as uuid from 'uuid';
import { Artist } from 'src/artists/artists.model';
import { randomUUID } from 'src/common/constants';
import { ITrack } from './interfaces/track.interface';
import { Album } from 'src/albums/albums.model';

@Entity('tracks')
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: randomUUID,
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @Column({ nullable: true })
  @ApiProperty({
    example: randomUUID,
    description: 'Album ID',
  })
  readonly albumId?: string | null = null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @Column({ nullable: true })
  @ApiProperty({
    example: randomUUID,
    description: 'Artist ID',
  })
  readonly artistId?: string | null = null;

  @Column()
  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @Column()
  @ApiProperty({ example: 300, description: 'Duration' })
  readonly duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
