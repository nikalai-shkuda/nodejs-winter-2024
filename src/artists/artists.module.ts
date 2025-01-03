import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistRepository } from './artists.repository';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: ArtistRepository, useClass: ArtistRepository },
  ],
  imports: [AlbumsModule, TracksModule],
  exports: [ArtistsService],
})
export class ArtistsModule {}
