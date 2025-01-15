import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMessages } from 'src/common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const isExistUser = await this.getUserByLogin(dto.login);
    if (isExistUser) {
      throw new BadRequestException(errorMessages.USER_ALREADY_EXISTS);
    }

    const user = this.userRepository.create({
      login: dto.login,
      password: dto.password,
    });
    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(errorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: {
        login,
      },
    });
    return user;
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    this.userRepository.delete(id);
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.getUserById(id);
    const isEqualPasswords = user.password === dto.oldPassword;
    if (!isEqualPasswords) {
      throw new ForbiddenException(errorMessages.USER_WRONG_PASSWORD);
    }

    await this.userRepository.update(id, {
      password: dto.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    });
    return this.getUserById(id);
  }
}
