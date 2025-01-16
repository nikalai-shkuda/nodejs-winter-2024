import { HttpException, HttpStatus } from '@nestjs/common';
import { errorMessages } from '../constants';

export function getTokenFromHeader(tokenString: string): string {
  const [bearer, token] = tokenString.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw new HttpException(
      errorMessages.USER_IS_NOT_AUTHORIZED,
      HttpStatus.UNAUTHORIZED,
    );
  }
  return token;
}
