import { PartialType } from '@nestjs/swagger';
import { CreatePemantauanDto } from './create-pemantauan.dto';

export class UpdatePemantauanDto extends PartialType(CreatePemantauanDto) {}
