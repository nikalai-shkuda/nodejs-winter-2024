import { Injectable } from '@nestjs/common';
import { IFavorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesRepository {
  private albums: string[] = [];
  private artists: string[] = [];
  private tracks: string[] = [];

  addTrack(id: string): void {
    this.tracks.push(id);
  }

  removeTrack(id: string): void {
    this.tracks = this.tracks.filter((el) => el !== id);
  }

  addArtist(id: string): void {
    this.artists.push(id);
  }

  removeArtist(id: string): void {
    this.artists = this.artists.filter((el) => el !== id);
  }

  addAlbum(id: string): void {
    this.albums.push(id);
  }

  removeAlbum(id: string): void {
    this.albums = this.albums.filter((el) => el !== id);
  }

  getAll(): IFavorites {
    return {
      albums: this.albums,
      artists: this.artists,
      tracks: this.tracks,
    };
  }
}
