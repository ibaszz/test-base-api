import {Client} from 'minio';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger';
import Constants from './constants';
import GeocodeService from './GeocodeService';
import { PDFService } from './PDFService';
import S3Helper from './S3Helper';

@Module({
  imports: [LoggerModule],
  providers: [PDFService, GeocodeService, {
    provide: Constants.PROVIDER_S3,
    useFactory: () => {
      return new Client({
        endPoint: process.env.S3_ENDPOINT,
        port: parseInt(process.env.S3_PORT),
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        useSSL: false
     });
    }
  }, S3Helper],
  exports: [PDFService, GeocodeService, S3Helper],
})
export class HelperModule {}
