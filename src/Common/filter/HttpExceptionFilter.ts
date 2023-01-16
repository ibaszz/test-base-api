import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException, BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException | BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(`Error ${status} for Request`, {
      context: {
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        exception: exception,
      },
    });

    if (exception instanceof BadRequestException) {
      return response.status(status).json({
        statusCode: status,
        statusDesc: exception.message,
        message: exception.getResponse()['message'],
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    return response.status(status).json({
      statusCode: status,
      statusDesc: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
