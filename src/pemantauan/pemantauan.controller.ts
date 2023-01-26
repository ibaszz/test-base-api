import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Response as ResponseCommon,
  StreamableFile,
} from '@nestjs/common';
import { PemantauanService } from './pemantauan.service';
import { CreatePemantauanDto } from './dto/create-pemantauan.dto';
import { UpdatePemantauanDto } from './dto/update-pemantauan.dto';
import { PDFService } from 'src/Common/helper/PDFService';
import { createReadStream } from 'fs';

@Controller('pemantauan')
export class PemantauanController {
  constructor(
    private readonly pemantauanService: PemantauanService,
    private readonly pdfService: PDFService,
  ) {}

  @Post()
  create(@Body() createPemantauanDto: CreatePemantauanDto) {
    return this.pemantauanService.create(createPemantauanDto);
  }

  @Get()
  async findAll(@Res({ passthrough: true }) res) {
    try {
      const buff: Buffer =
        await this.pdfService.generatePemantauanPDFPuppeteer();
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
        'Content-Length': buff.length,

        // prevent cache
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      });
      res.end(buff);
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pemantauanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePemantauanDto: UpdatePemantauanDto,
  ) {
    return this.pemantauanService.update(+id, updatePemantauanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pemantauanService.remove(+id);
  }
}
