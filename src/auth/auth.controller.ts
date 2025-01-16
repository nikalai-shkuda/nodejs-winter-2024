import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorMessages } from 'src/common/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

class AuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIU.eyJlbWFpbCI6.45Gk3IerOV7',
    description: 'JWT token',
  })
  readonly token: string;
}

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    description: errorMessages.LOGIN_SUCCESS,
    status: HttpStatus.OK,
    type: AuthResponse,
  })
  @ApiResponse({
    description: errorMessages.LOGIN_FAIL_CREDENTIAL,
    status: HttpStatus.FORBIDDEN,
  })
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({
    description: errorMessages.SIGNUP_SUCCESS,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Bad request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: errorMessages.USER_ALREADY_EXISTS,
    status: HttpStatus.CONFLICT,
  })
  @Post('/signup')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
