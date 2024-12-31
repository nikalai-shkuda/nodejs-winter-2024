import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './interfaces/track.interface';
import { Track } from './tracks.model';

@Injectable()
export class TrackRepository {
  private tracks: ITrack[] = [];

  create(dto: CreateTrackDto): ITrack {
    const track = new Track(dto);
    this.tracks.push(track);
    return track;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  getAll(): ITrack[] {
    return this.tracks;
  }

  getById(id: string): ITrack | null {
    return this.tracks.find((track) => track.id === id) || null;
  }

  update(id: string, track: UpdateTrackDto): ITrack | null {
    this.tracks = this.tracks.map((el) => {
      if (el.id === id) {
        return new Track({
          ...el,
          ...track,
        });
      }
      return el;
    });
    return this.getById(id);
  }
}
