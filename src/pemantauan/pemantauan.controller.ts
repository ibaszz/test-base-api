import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Response as ResponseCommon,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { PemantauanService } from './pemantauan.service';
import { CreatePemantauanDto } from './dto/create-pemantauan.dto';
import { UpdatePemantauanDto } from './dto/update-pemantauan.dto';
import { PDFService } from 'src/Common/helper/PDFService';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { users } from '@prisma/client';
import { CreatePemantauanDetailDto } from './dto/create-pemantauan-detail-dto';
import { CreatePemantauanKelengkapanDto } from './dto/create-pemantauan-kelengkapan-dto';
import { CreatePemantauanPhotoDto } from './dto/create-pemantauan-photo-dto';


@ApiTags('Pemantauan Controller')
@Controller('pemantauan')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PemantauanController {
  constructor(
    private readonly pemantauanService: PemantauanService,
    private readonly pdfService: PDFService,
  ) {}

  @Post()
  create(@Req() req, @Body() createPemantauanDto: CreatePemantauanDto) {
    const user = req.user;
    return this.pemantauanService.create(createPemantauanDto, user);
  }

  @Post("/detail")
  createPemantauanDetail(@Req() req, @Body() createPemantauanDetailDto: CreatePemantauanDetailDto) {
    const user = req.user;
    return this.pemantauanService.createPemantauanDetail(createPemantauanDetailDto, user);
  }

  @Post("/kelengkapan")
  createPemantauanKelengkapan(@Req() req, @Body() createPemantauanKelengkapan: CreatePemantauanKelengkapanDto) {
    const user = req.user;
    return this.pemantauanService.createPemantauanKelengkapan(createPemantauanKelengkapan, user);
  }

  @Post("/photos")
  createPemantauanPhotos(@Req() req, @Body() createPemantauanPhoto: CreatePemantauanPhotoDto) {
    const user = req.user;
    return this.pemantauanService.createPhoto(createPemantauanPhoto, user);
  }

  @Get('/generate-pdf-html/:id')
  async generatePdfHtml(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ) {
    const supervisions = await this.pemantauanService.findOne(+id);
    const html = await this.pdfService.generatePemantauanPDFPuppeteerHtml(
      supervisions,
    );
    res.set({ 'content-type': 'text/html' });
    return html;
  }

  @Get('/generate-pdf/:id')
  async findAll(@Param('id') id: string, @Res({ passthrough: true }) res) {
    try {
      const supervisions = await this.pemantauanService.findOne(+id);
      const buff: Buffer = await this.pdfService.generatePemantauanPDFPuppeteer(
        supervisions,
      );
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
