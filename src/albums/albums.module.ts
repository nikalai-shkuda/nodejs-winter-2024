import { Module } from '@nestjs/common';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: AlbumRepository, useClass: AlbumRepository },
  ],
  imports: [TracksModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
