export interface ITrack {
  id: string;
  albumId?: string | null;
  artistId?: string | null;
  duration: number;
  name: string;
}
