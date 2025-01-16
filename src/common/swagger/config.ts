import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_NAME = 'JWT-auth';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Home Library Service')
  .setDescription('Home music library service')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    SWAGGER_NAME,
  )
  .build();
