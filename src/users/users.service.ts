import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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

    const user = this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    return this.userRepository.getAll();
  }

  async getUserById(id: string) {
    const user = this.userRepository.getById(id);
    if (!user) {
      throw new HttpException('User has not been found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByLogin(login: string) {
    const user = this.userRepository.getByLogin(login);
    return user;
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    const user = await this.userRepository.delete(id);
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

    const updatedUser = this.userRepository.update(id, {
      password: dto.newPassword,
    });
    return updatedUser;
  }
}
