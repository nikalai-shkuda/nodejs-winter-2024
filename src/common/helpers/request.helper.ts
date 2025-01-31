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

export const routeGuardMatcher = (
  routePath: string,
  requestPath: string,
): boolean => {
  if (routePath.includes('*')) {
    const basePath = routePath.split('*')[0];
    return requestPath.startsWith(basePath);
  }
  return routePath === requestPath;
};
