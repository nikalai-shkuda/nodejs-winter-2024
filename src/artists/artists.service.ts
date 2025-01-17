import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessages } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Artist } from './artists.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(dto);
    return this.artistRepository.save(artist);
  }

  async getAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(errorMessages.ARTIST_NOT_FOUND);
    }
    return artist;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.artistRepository.delete(id);
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    await this.getById(id);
    await this.artistRepository.update(id, dto);
    return this.getById(id);
  }
}
