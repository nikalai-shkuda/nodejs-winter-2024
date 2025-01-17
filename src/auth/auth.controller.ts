import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { errorMessages, ROUTES } from 'src/common/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { AuthResponse } from './response/auth.response';

@ApiTags('Auth')
@Controller(ROUTES.AUTH)
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

  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiResponse({
    description: errorMessages.REFRESH_SUCCESS,
    status: HttpStatus.OK,
    type: AuthResponse,
  })
  @ApiResponse({
    description: errorMessages.REFRESH_FAIL,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: errorMessages.REFRESH_FORBIDDEN,
    status: HttpStatus.FORBIDDEN,
  })
  @Post('refresh')
  refreshToken(@Body() CreateRefreshTokenDto: CreateRefreshTokenDto) {
    return this.authService.refreshTokens(CreateRefreshTokenDto);
  }

  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({
    description: errorMessages.SIGNUP_SUCCESS,
    status: HttpStatus.CREATED,
    type: AuthResponse,
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
