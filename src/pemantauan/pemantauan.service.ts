import { Injectable } from '@nestjs/common';
import { CreatePemantauanDto } from './dto/create-pemantauan.dto';
import { UpdatePemantauanDto } from './dto/update-pemantauan.dto';

@Injectable()
export class PemantauanService {
  create(createPemantauanDto: CreatePemantauanDto) {
    return 'This action adds a new pemantauan';
  }

  findAll() {
    return `This action returns all pemantauan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pemantauan`;
  }

  update(id: number, updatePemantauanDto: UpdatePemantauanDto) {
    return `This action updates a #${id} pemantauan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pemantauan`;
  }
}
