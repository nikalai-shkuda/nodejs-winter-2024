import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
import { randomUUID } from 'src/common/constants';
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

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
