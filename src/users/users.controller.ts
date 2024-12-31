import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UUIDParam } from 'src/common/helpers/request.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { userExample } from './mock/open.api';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ example: userExample, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ example: userExample, status: HttpStatus.OK, type: [User] })
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ example: userExample, status: HttpStatus.OK, type: User })
  @Get(':id')
  getUserById(@UUIDParam('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ example: userExample, status: HttpStatus.OK, type: User })
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
