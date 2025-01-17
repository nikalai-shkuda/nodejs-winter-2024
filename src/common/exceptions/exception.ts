import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception?.message || 'Internal server error';

    this.loggingService.error(
      `Error occurred during request:
       URL: ${request.url},
       Method: ${request.method},
       Query: ${JSON.stringify(request.query)},
       Body: ${JSON.stringify(request.body)}
       Status: ${status},
       Message: ${exception?.stack || message}`,
    );

    response.status(status).json({
      message,
      statusCode: status,
    });
  }
}
