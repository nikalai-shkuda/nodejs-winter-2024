import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: FavoritesRepository, useClass: FavoritesRepository },
  ],
  imports: [AlbumsModule, ArtistsModule, TracksModule],
})
export class FavoritesModule {}
