import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackRepository } from './tracks.repository';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    { provide: TrackRepository, useClass: TrackRepository },
  ],
  exports: [TracksService],
})
export class TracksModule {}
