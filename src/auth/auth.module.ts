import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'src/common/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.ACCESS_SECRET,
      signOptions: {
        expiresIn: jwtConstants.ACCESS_EXPIRES_IN,
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
