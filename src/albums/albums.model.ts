import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as uuid from 'uuid';
import { Artist } from 'src/artists/artists.model';
import { randomUUID } from 'src/common/constants';
import { Track } from 'src/tracks/tracks.model';
import { IAlbum } from './interfaces/album.interface';

@Entity('albums')
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: randomUUID,
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ManyToOne(() => Artist, (artist) => artist.albums, {
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
  @ApiProperty({ example: 2024, description: 'Year' })
  readonly year: number;

  @OneToMany(() => Track, (track) => track.album, { cascade: true })
  tracks: Track[];

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
