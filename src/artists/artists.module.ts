import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistRepository } from './artists.repository';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: ArtistRepository, useClass: ArtistRepository },
  ],
})
export class ArtistsModule {}
