import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from 'src/common/config';
import { errorMessages } from 'src/common/constants';
import { JwtUserPayload } from 'src/common/types/auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { AuthResponse } from './response/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    const payload: JwtUserPayload = {
      login: user.login,
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.REFRESH_SECRET,
      expiresIn: jwtConstants.REFRESH_EXPIRES_IN,
    });

    const response: AuthResponse = {
      accessToken,
      refreshToken,
      id: user.id,
    };
    return response;
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async validateUser(dto: CreateUserDto) {
    try {
      const user = await this.userService.getUserByLogin(dto.login);
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
      if (!user || !passwordEquals) {
        throw new Error();
      }
      return user;
    } catch (error) {
      throw new HttpException(
        errorMessages.LOGIN_FAIL_CREDENTIAL,
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(dto.login);

    if (candidate) {
      throw new HttpException(
        errorMessages.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const salt = await jwtConstants.CRYPT_SALT;
    const hashPassword = await bcrypt.hash(dto.password, salt);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async refreshTokens(dto: CreateRefreshTokenDto) {
    const { refreshToken } = dto;
    if (!refreshToken) {
      throw new HttpException(
        errorMessages.REFRESH_FAIL,
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.REFRESH_SECRET,
      });
      const user = await this.userService.getUserByLogin(payload.login);
      return this.generateToken(user);
    } catch (error) {
      throw new HttpException(
        errorMessages.REFRESH_FORBIDDEN,
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }
}
