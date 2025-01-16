import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ENV_PATH } from './common/constants';
import { AllExceptionsFilter } from './common/exceptions/exception';
import { LoggerService } from './common/logger/logger.service';
import { LoggingMiddleware } from './common/logger/middleware/logger.middleware';
import { DB_CONNECTION_OPTIONS } from './db.connection';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV_PATH,
      isGlobal: true,
    }),
    AlbumsModule,
    ArtistsModule,
    AuthModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
    TypeOrmModule.forRoot({
      ...DB_CONNECTION_OPTIONS,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
