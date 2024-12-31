import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'src/common/constants';

export class CreateTrackDto {
  @ApiProperty({
    example: randomUUID,
    description: 'Album ID',
  })
  @IsOptional()
  @IsString()
  readonly albumId?: string | null;

  @ApiProperty({
    example: randomUUID,
    description: 'Artist ID',
  })
  @IsOptional()
  @IsString()
  readonly artistId?: string | null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 300, description: 'Duration' })
  @IsInt()
  readonly duration: number;
}
