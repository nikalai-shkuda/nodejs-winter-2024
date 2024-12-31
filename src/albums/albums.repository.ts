import { Injectable } from '@nestjs/common';
import { Album } from './albums.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbum } from './interfaces/album.interface';

@Injectable()
export class AlbumRepository {
  private albums: IAlbum[] = [];

  create(dto: CreateAlbumDto): IAlbum {
    const album = new Album(dto);
    this.albums.push(album);
    return album;
  }

  delete(id: string): void {
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  getAll(): IAlbum[] {
    return this.albums;
  }

  getById(id: string): IAlbum | null {
    return this.albums.find((album) => album.id === id) || null;
  }

  update(id: string, album: Partial<IAlbum>): IAlbum | null {
    this.albums = this.albums.map((el) => {
      if (el.id === id) {
        return new Album({
          ...el,
          ...album,
        });
      }
      return el;
    });
    return this.getById(id);
  }
}
