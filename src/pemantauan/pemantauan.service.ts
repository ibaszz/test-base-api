import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'src/Common/logger/Logger';
import Cache from 'cache-manager';
import { PrismaService } from 'src/config/db/PrismaService';
import { CreatePemantauanDto } from './dto/create-pemantauan.dto';
import { UpdatePemantauanDto } from './dto/update-pemantauan.dto';
import { users } from '@prisma/client';
import { CreatePemantauanDetailDto } from './dto/create-pemantauan-detail-dto';
import { CreatePemantauanKelengkapanDto } from './dto/create-pemantauan-kelengkapan-dto';
import GeocodeService from 'src/Common/helper/GeocodeService';
import { CreatePemantauanPhotoDto } from './dto/create-pemantauan-photo-dto';
import S3Helper from 'src/Common/helper/S3Helper';
import * as moment from 'moment';

@Injectable()
export class PemantauanService {
  constructor(
    private geocode: GeocodeService,
    private s3Helper: S3Helper,
    private prisma: PrismaService,
    private logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  create(createPemantauanDto: CreatePemantauanDto, user: any) {
    return this.prisma.supervisions.create({data: {sumurKe: createPemantauanDto.sumurKe, userId: user.userId}})
  }

  async createPemantauanDetail(createPemantauanDetail: CreatePemantauanDetailDto, user: any) {
      const {country, kecamatan, kelurahan, kota, postalCode, province} = await this.geocode.getLocation(createPemantauanDetail.latitude, createPemantauanDetail.longitude);
      
      this.logger.log(`[Request, CreatePemantauanDetail] user: ${user.userId}, request: ${JSON.stringify(createPemantauanDetail)}`)
      const supervisionDetail = await this.prisma.supervision_details.create({
        data: {
          supervisionId: createPemantauanDetail.supervisionId,
          alamatSumur: createPemantauanDetail.alamatSumur, 
          provinsi: province,
          desa: kelurahan,
          kabupaten: kota,
          kecamatan: kecamatan,
          kedalamanKontruksi: createPemantauanDetail.kedalamanKonstruksi,
          kedalamanMAT: createPemantauanDetail.kedalamanMukaAirTanah,
          kedalamanSumur: createPemantauanDetail.kedalamanSumur,
          peruntukan: createPemantauanDetail.peruntukan,
          diameterLubangBor1A: createPemantauanDetail.diameterLubangPengeboran,
          catatanPengeboran: createPemantauanDetail.catatanPengeboran
        }
      });

      this.logger.log(`[Request, CreatePemantauanDetail, supervision_details, SUCCESS] user: ${user.userId}, result: ${JSON.stringify(supervisionDetail)}`)
      
      const wellSpec = await this.prisma.supervision_well_spec.create({
        data: {
          supervisionId: createPemantauanDetail.supervisionId,
          diameterPipaNaik: createPemantauanDetail.diameterPipaNaik,
          panjangPipaNaik: createPemantauanDetail.panjangPipaNaik,
          gravelStart: createPemantauanDetail.gravel.split("-")[0],
          gravelEnd: createPemantauanDetail.gravel.split("-")[1],
          lempungStart: createPemantauanDetail.lempung.split("-")[0],
          lempungEnd: createPemantauanDetail.lempung.split("-")[1],
          penyemenanStart: createPemantauanDetail.corSemen.split("-")[0],
          penyemenanEnd: createPemantauanDetail.corSemen.split("-")[1],
          totalKedalamanKontruksi: createPemantauanDetail.kedalamanKonstruksi,
          catatanWellSpec: createPemantauanDetail.catatanPengeboran,
          diameterTotalPipa: createPemantauanDetail.diameterKonstruksi,
          diameterTotalPipaUkur: createPemantauanDetail.diameterLubangPengeboran
        }
      })

      
      this.logger.log(`[Request, CreatePemantauanDetail, supervision_well_spec, SUCCESS] user: ${user.userId}, result: ${JSON.stringify(wellSpec)}`)

      const akuivers = await this.prisma.supervision_akuiver.createMany({
        data: createPemantauanDetail.kedalamanAkuifer.split(",").map(r => ({
          supervisionId: createPemantauanDetail.supervisionId,
          start: parseInt(r.split("-")[0]),
          end: parseInt(r.split("-")[1]),
        }))
      });

      
      this.logger.log(`[Request, CreatePemantauanDetail, supervision_akuiver, SUCCESS] user: ${user.userId}, result: ${JSON.stringify(akuivers)}`)

      const screenPipe = await this.prisma.supervision_screen_pipe.createMany({
        data: createPemantauanDetail.posisiPipaScreen.split(",").map(r => ({
          supervisionId: createPemantauanDetail.supervisionId,
          start: parseInt(r.split("-")[0]),
          end: parseInt(r.split("-")[1]),
        }))
      });
      
      this.logger.log(`[Request, CreatePemantauanDetail, supervision_screen_pipe, SUCCESS] user: ${user.userId}, result: ${JSON.stringify(screenPipe)}`)

      return this.findOne(createPemantauanDetail.supervisionId);
  }

  async createPemantauanKelengkapan(createPemantauanKelengkapan: CreatePemantauanKelengkapanDto, user: any) {
      this.logger.log(`[Request, createPemantauanKelengkapan] user: ${user.userId}, request: ${JSON.stringify(createPemantauanKelengkapan)}`)
    
      const requirements = await this.prisma.supervision_requirements.create({
        data: {
          supervisionId: createPemantauanKelengkapan.supervisionId,
          fieldCoordinator: createPemantauanKelengkapan.namaKoordinatorLapangan,
          juruBor: createPemantauanKelengkapan.namaJuruBor,
          teams: createPemantauanKelengkapan.namaAnggotaTim.join(","),
          wellsiteGeologist: createPemantauanKelengkapan.namaWellsiteGeo
        }
      })

      this.logger.log(`[Request, CreatePemantauanDetail, supervision_requirements, SUCCESS] user: ${user.userId}, result: ${JSON.stringify(requirements)}`)

      return this.findOne(createPemantauanKelengkapan.supervisionId);
  }

  async createPhoto(createPemantauanPhoto: CreatePemantauanPhotoDto, user: any) { 
    const buffer = Buffer.from(createPemantauanPhoto.base64, 'base64');
    this.logger.log(`[Request, createPhoto] user: ${user.userId}`);
    console.log(buffer);
    const link = await this.s3Helper.putObject(`${createPemantauanPhoto.tag}/${createPemantauanPhoto.supervisionId}-${user.userId}-${moment().format("YYYYMMDDHHmmss")}.jpg`, buffer);
    return this.prisma.supervision_photos.create({
        data: {
          supervisionId: createPemantauanPhoto.supervisionId,
          caption: createPemantauanPhoto.caption,
          photoUrl: link,
          tag: createPemantauanPhoto.tag,
        }
      });
  }

  findAll() {
    return this.prisma.supervisions.findMany({include:{
      user: true,
      supervisionDetail: true,
      supervisionRequirement: true,
      supervisionPhotos: true,
      supervisionScreenAkuifer: true,
      supervisionScreenPipe: true,
      supervisionWellSpec: true,
    },});
  }

  findOne(id: number) {
    return this.prisma.supervisions.findUnique({
      where: { id: id },
      include: {
        user: true,
        supervisionDetail: true,
        supervisionRequirement: true,
        supervisionPhotos: true,
        supervisionScreenAkuifer: true,
        supervisionScreenPipe: true,
        supervisionWellSpec: true,
      },
    });
  }

  update(id: number, updatePemantauanDto: UpdatePemantauanDto) {
    return `This action updates a #${id} pemantauan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pemantauan`;
  }
}
