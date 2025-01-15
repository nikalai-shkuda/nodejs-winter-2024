import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { Artist } from './artists.model';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistsService],
})
export class ArtistsModule {}
