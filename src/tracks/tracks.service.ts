import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { errorMessages } from 'src/common/constants';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackRepository } from './tracks.repository';
import { ITrack } from './interfaces/track.interface';
import { UpdateTrackDto } from './dto/update-track.dto';

const validateFields = (dto: CreateTrackDto): void => {
  if (typeof dto.duration !== 'number' || typeof dto.name !== 'string') {
    throw new BadRequestException(errorMessages.TRACK_REQUIRED_PARAM);
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
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }
    return track;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    this.trackRepository.delete(id);
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
    const updatedTrack = this.trackRepository.update(id, dto);
    return updatedTrack;
  }
}
