import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpAdapterHost } from '@nestjs/core' 

import { Request, Response } from 'express';

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {

  constructor(private adapterHost: HttpAdapterHost){}

  catch(exception: unknown, host: ArgumentsHost) {

    const { httpAdapter } = this.adapterHost

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse<Response>();
    const requisicao = contexto.getRequest<Request>();

    const {status, body} =
        exception instanceof HttpException 
        ? {
            status: exception.getStatus(),
            body: exception.getResponse()
        }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body:{
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString,
                path: httpAdapter.getRequestUrl(requisicao)
            }
        }

        httpAdapter.reply(resposta, body, status);

  }
}
