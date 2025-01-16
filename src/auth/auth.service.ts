import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { DEFAULT_CRYPT_SALT, errorMessages } from 'src/common/constants';
import { JwtUserPayload } from 'src/common/types/auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';

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
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(dto.login);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException(
      errorMessages.LOGIN_FAIL_CREDENTIAL,
      HttpStatus.FORBIDDEN,
    );
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(dto.login);

    if (candidate) {
      throw new HttpException(
        errorMessages.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const salt = Number(process.env.CRYPT_SALT) || DEFAULT_CRYPT_SALT;
    const hashPassword = await bcrypt.hash(dto.password, salt);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
}
