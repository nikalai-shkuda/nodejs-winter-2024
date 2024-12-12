import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumRepository } from './albums.repository';
import { IAlbum } from './interfaces/album.interface';
import { UpdateAlbumDto } from './dto/update-album.dto';

const validateFields = (dto: CreateAlbumDto): void => {
  if (typeof dto.year !== 'number' || typeof dto.name !== 'string') {
    throw new HttpException(
      'Grammy and name are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};

@Injectable()
export class AlbumsService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create(dto: CreateAlbumDto): Promise<IAlbum> {
    validateFields(dto);
    return this.albumRepository.create(dto);
  }

  async getAll(): Promise<IAlbum[]> {
    return this.albumRepository.getAll();
  }

  async getById(id: string): Promise<IAlbum> {
    const artist = this.albumRepository.getById(id);
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
    const artist = await this.albumRepository.delete(id);
    return artist;
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<IAlbum> {
    await this.getById(id);
    validateFields(dto);
    const updatedArtist = this.albumRepository.update(id, dto);
    return updatedArtist;
  }
}
