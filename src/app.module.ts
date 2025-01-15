import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { ENV_PATH } from './common/constants';
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
    FavoritesModule,
    TracksModule,
    UsersModule,
    TypeOrmModule.forRoot({
      ...DB_CONNECTION_OPTIONS,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
