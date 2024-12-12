import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUIDParam } from 'src/common/helpers/request.decorators';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './interfaces/track.interface';
import { Track } from './tracks.model';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  @Post()
  createTrack(@Body() dto: CreateTrackDto): Promise<ITrack> {
    return this.trackService.create(dto);
  }

  @ApiOperation({ summary: 'Get tracks' })
  @ApiResponse({ status: HttpStatus.OK, type: [Track] })
  @Get()
  getTracks(): Promise<ITrack[]> {
    return this.trackService.getAll();
  }

  @ApiOperation({ summary: 'Get track' })
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  @Get(':id')
  getTrackById(@UUIDParam('id') id: string): Promise<ITrack> {
    return this.trackService.getById(id);
  }

  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  @Put(':id')
  updateTrack(
    @UUIDParam('id') id: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTrack(@UUIDParam('id') id: string): Promise<void> {
    return this.trackService.delete(id);
  }
}
