import { Album } from 'src/albums/albums.model';
import { Artist } from 'src/artists/artists.model';
import { Track } from 'src/tracks/tracks.model';

export const artistExample = new Artist({
  grammy: true,
  name: 'Artist',
});

export const albumExample = new Album({
  artistId: artistExample.id,
  name: 'Album',
  year: 2024,
});

export const trackExample = new Track({
  albumId: albumExample.id,
  artistId: artistExample.id,
  duration: 300,
  name: 'Track',
});

export const favoritesExample = {
  albums: [albumExample],
  artists: [artistExample],
  tracks: [trackExample],
};
