import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger';
import GeocodeService from './GeocodeService';
import { PDFService } from './PDFService';

@Module({
  imports: [LoggerModule],
  providers: [PDFService, GeocodeService],
  exports: [PDFService, GeocodeService],
})
export class HelperModule {}
