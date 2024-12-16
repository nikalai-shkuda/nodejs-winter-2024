import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';

export interface IFavorites {
  albums: string[];
  artists: string[];
  tracks: string[];
}

export interface IFavoritesResponse {
  albums: IAlbum[];
  artists: IArtist[];
  tracks: ITrack[];
}
