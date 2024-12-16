import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from 'src/albums/albums.model';
import { AlbumsService } from 'src/albums/albums.service';
import { Artist } from 'src/artists/artists.model';
import { ArtistsService } from 'src/artists/artists.service';
import { Track } from 'src/tracks/tracks.model';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesRepository } from './favorites.repository';
import { IFavoritesResponse } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
  ) {}

  async getAll(): Promise<IFavoritesResponse> {
    const favorites = this.favoritesRepository.getAll();
    const entities = await Promise.allSettled([
      ...favorites.albums.map((id) => this.albumService.getById(id)),
      ...favorites.artists.map((id) => this.artistService.getById(id)),
      ...favorites.tracks.map((id) => this.trackService.getById(id)),
    ]);

    const result: IFavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };

    entities.forEach((el) => {
      if (el.status !== 'fulfilled') {
        return;
      }
      if (el.value instanceof Album) {
        result.albums.push(el.value);
      } else if (el.value instanceof Artist) {
        result.artists.push(el.value);
      } else if (el.value instanceof Track) {
        result.tracks.push(el.value);
      }
    });

    return result;
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.albumService.getById(id);
      return this.favoritesRepository.addAlbum(id);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Album has not been found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeAlbum(id: string): Promise<void> {
    try {
      await this.albumService.getById(id);
      return this.favoritesRepository.removeAlbum(id);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Album has not been found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.artistService.getById(id);
      return this.favoritesRepository.addArtist(id);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Artist has not been found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeArtist(id: string): Promise<void> {
    try {
      await this.artistService.getById(id);
      return this.favoritesRepository.removeArtist(id);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Artist has not been found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addTrack(id: string): Promise<void> {
    try {
      await this.trackService.getById(id);
      return this.favoritesRepository.addTrack(id);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Track has not been found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeTrack(id: string): Promise<void> {
    try {
      await this.trackService.getById(id);
      return this.favoritesRepository.removeTrack(id);
    } catch (e) {
      console.error(e);
      throw new HttpException('Track has not been found', HttpStatus.NOT_FOUND);
    }
  }
}
