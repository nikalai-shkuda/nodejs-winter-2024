import { Injectable } from '@nestjs/common';
import { Artist } from './artists.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from './interfaces/artist.interface';

@Injectable()
export class ArtistRepository {
  private artists: IArtist[] = [];

  create(dto: CreateArtistDto): IArtist {
    const artist = new Artist({
      grammy: dto.grammy,
      name: dto.name,
    });
    this.artists.push(artist);
    return artist;
  }

  delete(id: string): void {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }

  getAll(): IArtist[] {
    return this.artists;
  }

  getById(id: string): IArtist | null {
    return this.artists.find((artist) => artist.id === id) || null;
  }

  update(id: string, artist: Partial<IArtist>): IArtist | null {
    this.artists = this.artists.map((el) => {
      if (el.id === id) {
        return new Artist({
          ...el,
          ...artist,
        });
      }
      return el;
    });
    return this.getById(id);
  }
}
