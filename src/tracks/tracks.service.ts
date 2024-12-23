import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMessages } from 'src/common/constants';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './tracks.model';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.create(dto);
    return this.trackRepository.save(track);
  }

  async getAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }
    return track;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    this.trackRepository.delete(id);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    await this.getById(id);
    await this.trackRepository.update(id, dto);
    return this.getById(id);
  }
}
