import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
import { randomUUID } from 'src/common/constants';
import { IUser } from './interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: randomUUID,
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @Column({ unique: true })
  @ApiProperty({ example: 'example', description: 'Login' })
  readonly login: string;

  @Column()
  @Exclude()
  @ApiProperty({ example: 'qwert', description: 'Password' })
  readonly password: string;

  @Column({ default: 1 })
  @ApiProperty({ example: 1, description: 'Password' })
  readonly version: number = 1;

  @Column({ type: 'double precision' })
  @ApiProperty({ example: 1733933613671, description: 'Password' })
  readonly createdAt: number = Date.now();

  @Column({ type: 'double precision' })
  @ApiProperty({ example: 1733933613671, description: 'Password' })
  readonly updatedAt: number = this.createdAt;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
