import { Module } from '@nestjs/common';
import { PDFService } from './PDFService';

@Module({
  providers: [PDFService],
  exports: [PDFService],
})
export class HelperModule {}
