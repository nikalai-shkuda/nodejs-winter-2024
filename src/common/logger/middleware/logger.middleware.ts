import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/common/logger/logger.service';
import { JwtUserPayload } from 'src/common/types/auth';

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

type RequestWithUser = Request & { user: JwtUserPayload };

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggerService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const { url, method, query, body } = req;
      const logMessage = `Request: ${method} ${url}, Query: ${JSON.stringify(query)}, Body: ${JSON.stringify(body)}, Response Status: ${res.statusCode}, User ID: ${req?.user?.userId}`;
      if (res.statusCode < 400) {
        this.loggingService.log(logMessage, getContext(url));
      } else {
        this.loggingService.error(logMessage, '', getContext(url));
      }
    });

    next();
  }
}
