import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UUIDParam } from 'src/common/helpers/request.decorators';
import { Favorites } from './favorites.model';
import { FavoritesService } from './favorites.service';
import { IFavoritesResponse } from './interfaces/favorites.interface';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: HttpStatus.OK, type: [Favorites] })
  @Get()
  getAll(): Promise<IFavoritesResponse> {
    return this.favoritesService.getAll();
  }

  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album with id does not exist',
  })
  @Post('album/:id')
  addAlbumToFavorites(@UUIDParam('id') id: string): Promise<void> {
    return this.favoritesService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbumFromFavorites(@UUIDParam('id') id: string): Promise<void> {
    return this.favoritesService.removeAlbum(id);
  }

  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiOkResponse({ description: 'Artist added to favorites' })
  @Post('artist/:id')
  addArtistToFavorites(@UUIDParam('id') id: string): Promise<void> {
    return this.favoritesService.addArtist(id);
  }

  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiNoContentResponse({ description: 'No content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtistFromFavorites(@UUIDParam('id') id: string): Promise<void> {
    return this.favoritesService.removeArtist(id);
  }

  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiOkResponse({ description: 'Track added to favorites' })
  @Post('track/:id')
  addTrackToFavorites(@UUIDParam('id') id: string): Promise<void> {
    return this.favoritesService.addTrack(id);
  }

  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiNoContentResponse({ description: 'No content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrackFromFavorites(@UUIDParam('id') id: string): Promise<void> {
    return this.favoritesService.removeTrack(id);
  }
}
