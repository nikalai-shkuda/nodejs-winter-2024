import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { errorMessages } from 'src/common/constants';
import { TracksService } from 'src/tracks/tracks.service';
import { Favorites } from './favorites.model';
import { FavoutitesEntityType } from './types/entity.types';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
  ) {}

  async getAll(): Promise<Favorites> {
    const favorites = await this.favoritesRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (favorites) {
      return favorites;
    }
    return this.createEmptyFavorites();
  }

  async createEmptyFavorites(): Promise<Favorites> {
    const favorites = this.favoritesRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });

    return this.favoritesRepository.save(favorites);
  }

  async addFavorite(
    type: FavoutitesEntityType,
    id: string,
  ): Promise<Favorites> {
    switch (type) {
      case FavoutitesEntityType.ARTIST:
        return this.addArtistToFavorites(id);
      case FavoutitesEntityType.ALBUM:
        return this.addAlbumToFavorites(id);
      case FavoutitesEntityType.TRACK:
        return this.addTrackToFavorites(id);
      default:
        throw new NotFoundException('Invalid favorite type');
    }
  }

  async addArtistToFavorites(artistId: string): Promise<Favorites> {
    try {
      const favorites = await this.getAll();
      const alreadyExists = favorites.artists.some((el) => el.id === artistId);
      if (!alreadyExists) {
        const artist = await this.artistService.getById(artistId);
        favorites.artists.push(artist);
        await this.favoritesRepository.save(favorites);
      }
      return favorites;
    } catch (e) {
      console.error(e);
      throw new UnprocessableEntityException(errorMessages.ARTIST_NOT_FOUND);
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<Favorites> {
    try {
      const favorites = await this.getAll();
      const alreadyExists = favorites.albums.some((el) => el.id === albumId);
      if (!alreadyExists) {
        const album = await this.albumService.getById(albumId);
        favorites.albums.push(album);
        await this.favoritesRepository.save(favorites);
      }
      return favorites;
    } catch (e) {
      console.error(e);
      throw new UnprocessableEntityException(errorMessages.ALBUM_NOT_FOUND);
    }
  }

  async addTrackToFavorites(trackId: string): Promise<Favorites> {
    try {
      const favorites = await this.getAll();
      const alreadyExists = favorites.tracks.some((el) => el.id === trackId);
      if (!alreadyExists) {
        const track = await this.trackService.getById(trackId);
        favorites.tracks.push(track);
        await this.favoritesRepository.save(favorites);
      }
      return favorites;
    } catch (e) {
      console.error(e);
      throw new UnprocessableEntityException(errorMessages.TRACK_NOT_FOUND);
    }
  }

  async removeFavorite(type: FavoutitesEntityType, id: string): Promise<void> {
    const favorites = await this.getAll();

    switch (type) {
      case FavoutitesEntityType.ARTIST:
        favorites.artists = favorites.artists.filter((el) => el.id !== id);
        break;
      case FavoutitesEntityType.ALBUM:
        favorites.albums = favorites.albums.filter((el) => el.id !== id);
        break;
      case FavoutitesEntityType.TRACK:
        favorites.tracks = favorites.tracks.filter((el) => el.id !== id);
        break;
      default:
        throw new BadRequestException('Invalid favorite type');
    }

    await this.favoritesRepository.save(favorites);
  }
}
