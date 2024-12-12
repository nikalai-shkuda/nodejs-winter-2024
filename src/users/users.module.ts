import { Module } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UserRepository, useClass: UserRepository },
  ],
})
export class UsersModule {}
