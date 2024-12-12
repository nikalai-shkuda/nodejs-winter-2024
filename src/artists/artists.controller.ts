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
import { Artist } from './artists.model';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './interfaces/artist.interface';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  @Post()
  createArtist(@Body() dto: CreateArtistDto): Promise<IArtist> {
    return this.artistService.create(dto);
  }

  @ApiOperation({ summary: 'Get artists' })
  @ApiResponse({ status: HttpStatus.OK, type: [Artist] })
  @Get()
  getArtists(): Promise<IArtist[]> {
    return this.artistService.getAll();
  }

  @ApiOperation({ summary: 'Get artist' })
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  @Get(':id')
  getArtistById(@UUIDParam('id') id: string): Promise<IArtist> {
    return this.artistService.getById(id);
  }

  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  @Put(':id')
  updateArtist(
    @UUIDParam('id') id: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@UUIDParam('id') id: string): Promise<void> {
    return this.artistService.delete(id);
  }
}
