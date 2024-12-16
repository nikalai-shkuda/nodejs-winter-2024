import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'src/common/constants';

export class UpdateAlbumDto {
  @ApiProperty({
    example: randomUUID,
    description: 'Artist ID',
  })
  readonly artistId?: string | null;

  @ApiProperty({ example: 'Album', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 2024, description: 'Year' })
  readonly year: number;
}
