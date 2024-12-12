import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackRepository } from './tracks.repository';
import { ITrack } from './interfaces/track.interface';
import { UpdateTrackDto } from './dto/update-track.dto';

const validateFields = (dto: CreateTrackDto): void => {
  if (typeof dto.duration !== 'number' || typeof dto.name !== 'string') {
    throw new HttpException(
      'Duration and name are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};
@Injectable()
export class TracksService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(dto: CreateTrackDto): Promise<ITrack> {
    validateFields(dto);
    return this.trackRepository.create(dto);
  }

  async getAll(): Promise<ITrack[]> {
    return this.trackRepository.getAll();
  }

  async getById(id: string): Promise<ITrack> {
    const artist = this.trackRepository.getById(id);
    if (!artist) {
      throw new HttpException('Track has not been found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    const artist = await this.trackRepository.delete(id);
    return artist;
  }

  async removeAlbumForTracks(albumId: string): Promise<void> {
    const allTracks = await this.getAll();
    const promises = allTracks.reduce((res, el) => {
      if (el.albumId === albumId) {
        res.push(
          this.update(el.id, {
            ...el,
            albumId: null,
          }),
        );
      }
      return res;
    }, []);
    Promise.all(promises);
  }

  async removeArtistForTracks(artistId: string): Promise<void> {
    const allTracks = await this.getAll();
    const promises = allTracks.reduce((res, el) => {
      if (el.artistId === artistId) {
        res.push(
          this.update(el.id, {
            ...el,
            artistId: null,
          }),
        );
      }
      return res;
    }, []);
    Promise.all(promises);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<ITrack> {
    await this.getById(id);
    validateFields(dto);
    const updatedArtist = this.trackRepository.update(id, dto);
    return updatedArtist;
  }
}
