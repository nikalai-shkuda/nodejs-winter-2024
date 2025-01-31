import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { errorMessages, ROUTES } from 'src/common/constants';
import {
  getTokenFromHeader,
  routeGuardMatcher,
} from 'src/common/helpers/request.helper';
import { JwtUserPayload } from 'src/common/types/auth';

const excludedRoutes = [
  { method: 'GET', path: '/' },
  { method: 'GET', path: '/api/docs*' },
  { method: 'POST', path: `/${ROUTES.AUTH}/*` },
];

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const isExcluded = excludedRoutes.some(
        (route) =>
          route.method === request.method &&
          routeGuardMatcher(route.path, request.url),
      );

      if (isExcluded) {
        return true;
      }

      const authHeader = request.headers.authorization;
      const token = getTokenFromHeader(authHeader);

      const user: JwtUserPayload = this.JwtService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        errorMessages.USER_IS_NOT_AUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
