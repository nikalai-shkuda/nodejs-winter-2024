import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/common/logger/logger.service';

enum CONTEXT {
  album = 'AlbumModule',
  artist = 'ArtistModule',
  favs = 'FavoritesModule',
  track = 'TrackModule',
  user = 'UserModule',
}

const getContext = (url: string): string => {
  const urlPath = url.split('/');
  return CONTEXT[urlPath[1]] || 'LoggerMiddleware';
};

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { baseUrl, method, query, body } = req;

    res.on('finish', () => {
      const logMessage = `Request: ${method} ${baseUrl}, Query: ${JSON.stringify(query)}, Body: ${JSON.stringify(body)}, Response Status: ${res.statusCode}`;
      if (res.statusCode < 400) {
        this.loggingService.log(logMessage, getContext(baseUrl));
      } else {
        this.loggingService.error(logMessage, '', getContext(baseUrl));
      }
    });

    next();
  }
}
