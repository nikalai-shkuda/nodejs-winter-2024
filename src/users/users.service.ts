import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  async createUser(dto: CreateUserDto) {
    const isExistUser = await this.getUserByLogin(dto.login);
    if (isExistUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (!dto.login || !dto.password) {
      throw new HttpException(
        'Login and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User({
      login: dto.login,
      password: dto.password,
    });
    this.users.push(user);
    return user;
  }

  async getAllUsers() {
    return this.users;
  }

  async getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User has not been found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByLogin(login: string) {
    const user = this.users.find((user) => user.login === login);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    if (!dto.oldPassword || !dto.newPassword) {
      throw new HttpException('Password are required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.getUserById(id);
    const isEqualPasswords = user.password === dto.oldPassword;
    if (!isEqualPasswords) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    this.users = this.users.map((el) => {
      if (el.id === id) {
        return new User({
          ...el,
          password: dto.newPassword,
          updatedAt: Date.now(),
          version: el.version + 1,
        });
      }
      return el;
    });
    const updatedUser = await this.getUserById(id);
    return updatedUser;
  }
}
