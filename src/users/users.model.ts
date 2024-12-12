import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as uuid from 'uuid';
import { IUser } from './interfaces/user.interface';

export class User implements IUser {
  @ApiProperty({
    example: '1eb16247-1f1b-4a69-a48b-9b44db773516',
    description: 'ID',
  })
  readonly id: string = uuid.v4();

  @ApiProperty({ example: 'example', description: 'Login' })
  readonly login: string;

  @Exclude()
  @ApiProperty({ example: 'qwert', description: 'Password' })
  readonly password: string;

  @ApiProperty({ example: 1, description: 'Password' })
  readonly version: number = 1;

  @ApiProperty({ example: 1733933613671, description: 'Password' })
  readonly createdAt: number = Date.now();

  @ApiProperty({ example: 1733933613671, description: 'Password' })
  readonly updatedAt: number = Date.now();

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
