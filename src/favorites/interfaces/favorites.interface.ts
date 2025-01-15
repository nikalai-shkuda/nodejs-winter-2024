import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';

export interface IFavorites {
  albums: IAlbum[];
  artists: IArtist[];
  tracks: ITrack[];
}
