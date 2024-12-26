import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { randomUUID } from 'src/common/constants';
import { UUIDParam } from 'src/common/helpers/request.decorators';
import { Favorites } from './favorites.model';
import { FavoritesService } from './favorites.service';
import { favoritesExample } from './mock/open.api';
import { FavoutitesEntityType } from './types/entity.types';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    example: favoritesExample,
    status: HttpStatus.OK,
    type: [Favorites],
  })
  @Get()
  getAll(): Promise<Favorites> {
    return this.favoritesService.getAll();
  }

  @ApiOperation({ summary: 'Add a favorite entity' })
  @ApiParam({
    name: 'entityType',
    description: 'The type of entity to add to favorites',
    enum: FavoutitesEntityType,
  })
  @ApiParam({
    name: 'entityId',
    description: 'An entity with this ID is added to favorites',
    example: randomUUID,
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: 'Bad. entityId is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({
    description: 'Entity does not exist',
  })
  @Post(':entityType/:entityId')
  async addFavorite(
    @Param('entityType') entityType: FavoutitesEntityType,
    @UUIDParam('entityId') entityId: string,
  ): Promise<Favorites> {
    return this.favoritesService.addFavorite(entityType, entityId);
  }

  @ApiOperation({ summary: 'Remove entity from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad. entityId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Entity was not found' })
  @Delete(':entityType/:entityId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavorite(
    @Param('entityType') entityType: FavoutitesEntityType,
    @UUIDParam('entityId') entityId: string,
  ): Promise<void> {
    return this.favoritesService.removeFavorite(entityType, entityId);
  }
}
