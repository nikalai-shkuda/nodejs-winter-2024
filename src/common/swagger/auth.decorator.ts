import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SWAGGER_NAME } from './config';

export function SwaggerBearerDecorator() {
  return applyDecorators(ApiBearerAuth(SWAGGER_NAME));
}
