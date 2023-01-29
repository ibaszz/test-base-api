import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'src/Common/logger/Logger';
import Cache from 'cache-manager';
import { PrismaService } from 'src/config/db/PrismaService';
import { CreatePemantauanDto } from './dto/create-pemantauan.dto';
import { UpdatePemantauanDto } from './dto/update-pemantauan.dto';
import { users } from '@prisma/client';

@Injectable()
export class PemantauanService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  create(createPemantauanDto: CreatePemantauanDto, user: any) {
    return this.prisma.supervisions.create({data: {sumurKe: createPemantauanDto.sumurKe, userId: user.userId}})
  }

  findAll() {
    return `This action returns all pemantauan`;
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
