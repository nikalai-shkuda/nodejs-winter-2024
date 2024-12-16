import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'src/common/constants';

export class CreateTrackDto {
  @ApiProperty({
    example: randomUUID,
    description: 'Album ID',
  })
  readonly albumId?: string | null;

  @ApiProperty({
    example: randomUUID,
    description: 'Artist ID',
  })
  readonly artistId?: string | null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 300, description: 'Duration' })
  readonly duration: number;
}
