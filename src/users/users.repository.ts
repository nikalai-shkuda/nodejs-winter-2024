import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './users.model';

@Injectable()
export class UserRepository {
  private users: IUser[] = [];

  create(dto: CreateUserDto): IUser {
    const user = new User({
      login: dto.login,
      password: dto.password,
    });
    this.users.push(user);
    return user;
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getAll(): IUser[] {
    return this.users;
  }

  getById(id: string): IUser | null {
    return this.users.find((user) => user.id === id) || null;
  }

  getByLogin(login: string): IUser | null {
    const user = this.users.find((user) => user.login === login);
    return user;
  }

  update(id: string, user: Partial<IUser>): IUser | null {
    this.users = this.users.map((el) => {
      if (el.id === id) {
        return new User({
          ...el,
          ...user,
          updatedAt: Date.now(),
          version: el.version + 1,
        });
      }
      return el;
    });
    const updatedUser = this.getById(id);
    return updatedUser;
  }
}
