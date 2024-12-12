import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

const UUIDParam = (name: string) => Param(name, new ParseUUIDPipe());

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':id')
  getUserById(@UUIDParam('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Put(':id')
  updatePassword(
    @UUIDParam('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@UUIDParam('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
