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
import { Album } from './albums.model';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './interfaces/album.interface';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  @Post()
  createAlbum(@Body() dto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumService.create(dto);
  }

  @ApiOperation({ summary: 'Get albums' })
  @ApiResponse({ status: HttpStatus.OK, type: [Album] })
  @Get()
  getAlbums(): Promise<IAlbum[]> {
    return this.albumService.getAll();
  }

  @ApiOperation({ summary: 'Get album' })
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  @Get(':id')
  getAlbumById(@UUIDParam('id') id: string): Promise<IAlbum> {
    return this.albumService.getById(id);
  }

  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  @Put(':id')
  updateAlbum(
    @UUIDParam('id') id: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return this.albumService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlbum(@UUIDParam('id') id: string): Promise<void> {
    return this.albumService.delete(id);
  }
}
