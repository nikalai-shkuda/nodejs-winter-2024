import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumRepository } from './albums.repository';
import { IAlbum } from './interfaces/album.interface';
import { UpdateAlbumDto } from './dto/update-album.dto';

const validateFields = (dto: CreateAlbumDto): void => {
  if (typeof dto.year !== 'number' || typeof dto.name !== 'string') {
    throw new HttpException(
      'Name and year are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly trackService: TracksService,
  ) {}

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
      throw new HttpException('Album has not been found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.albumRepository.delete(id);
    this.trackService.removeAlbumForTracks(id);
  }

  async removeArtistForAlbums(artistId: string): Promise<void> {
    const allAlbums = await this.getAll();
    const promises = allAlbums.reduce((res, el) => {
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

  async update(id: string, dto: UpdateAlbumDto): Promise<IAlbum> {
    await this.getById(id);
    validateFields(dto);
    const updatedArtist = this.albumRepository.update(id, dto);
    return updatedArtist;
  }
}
