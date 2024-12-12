import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: AlbumRepository, useClass: AlbumRepository },
  ],
})
export class AlbumsModule {}
