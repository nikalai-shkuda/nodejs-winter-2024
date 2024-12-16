import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { errorMessages } from 'src/common/constants';
import { TracksService } from 'src/tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumRepository } from './albums.repository';
import { IAlbum } from './interfaces/album.interface';
import { UpdateAlbumDto } from './dto/update-album.dto';

const validateFields = (dto: CreateAlbumDto): void => {
  if (typeof dto.year !== 'number' || typeof dto.name !== 'string') {
    throw new BadRequestException(errorMessages.ALBUM_REQUIRED_PARAM);
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
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException(errorMessages.ALBUM_NOT_FOUND);
    }
    return album;
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
    const updatedAlbum = this.albumRepository.update(id, dto);
    return updatedAlbum;
  }
}
