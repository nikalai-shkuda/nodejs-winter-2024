import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
import { Album } from 'src/albums/albums.model';
import { randomUUID } from 'src/common/constants';
import { Track } from 'src/tracks/tracks.model';
import { IArtist } from './interfaces/artist.interface';

@Entity('artists')
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: randomUUID,
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @Column()
  @ApiProperty({ example: true, description: 'Grammy' })
  readonly grammy: boolean;

  @Column()
  @ApiProperty({ example: 'Queen', description: 'Name' })
  readonly name: string;

  @OneToMany(() => Album, (album) => album.artist, { cascade: true })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, { cascade: true })
  tracks: Track[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
