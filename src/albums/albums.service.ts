import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMessages } from 'src/common/constants';
import { Album } from './albums.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(dto);
    return this.albumRepository.save(album);
  }

  async getAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getById(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(errorMessages.ALBUM_NOT_FOUND);
    }
    return album;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.albumRepository.delete(id);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    await this.getById(id);
    await this.albumRepository.update(id, dto);
    return this.getById(id);
  }
}
