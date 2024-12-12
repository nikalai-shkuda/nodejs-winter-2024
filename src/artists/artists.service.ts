import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './interfaces/artist.interface';

const validateFields = (dto: CreateArtistDto): void => {
  if (typeof dto.grammy !== 'boolean' || typeof dto.name !== 'string') {
    throw new HttpException(
      'Grammy and name are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};

@Injectable()
export class ArtistsService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async create(dto: CreateArtistDto): Promise<IArtist> {
    validateFields(dto);
    return this.artistRepository.create(dto);
  }

  async getAll(): Promise<IArtist[]> {
    return this.artistRepository.getAll();
  }

  async getById(id: string): Promise<IArtist> {
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new HttpException(
        'Artist has not been found',
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    const artist = await this.artistRepository.delete(id);
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<IArtist> {
    await this.getById(id);
    validateFields(dto);
    const updatedArtist = this.artistRepository.update(id, dto);
    return updatedArtist;
  }
}
