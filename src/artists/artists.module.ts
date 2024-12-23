import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { Artist } from './artists.model';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TracksModule, TypeOrmModule.forFeature([Artist])],
  exports: [ArtistsService],
})
export class ArtistsModule {}
