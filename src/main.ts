import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yaml';
import * as path from 'path';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RS nodejs course')
    .setDescription('Course description')
    .setVersion('1.0.0')
    .addTag('Test tag')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs-my', app, document);

  const docsPath = path.join(__dirname, '..', 'doc/api.yaml');
  const docsFile = fs.readFileSync(docsPath, 'utf8');
  const swaggerDocument = yaml.parse(docsFile);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    const log = `Server is running on port: ${PORT}; NODE_ENV: ${process.env.NODE_ENV}`;
    logger.log(log);
  });
}
bootstrap();
