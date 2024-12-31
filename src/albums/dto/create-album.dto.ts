import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'src/common/constants';

export class CreateAlbumDto {
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

  @ApiProperty({ example: 2024, description: 'Year' })
  @IsInt()
  readonly year: number;
}
