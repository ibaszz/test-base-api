import { Module } from '@nestjs/common';
import { PemantauanService } from './pemantauan.service';
import { PemantauanController } from './pemantauan.controller';
import { HelperModule } from 'src/Common/helper';

@Module({
  imports: [HelperModule],
  controllers: [PemantauanController],
  providers: [PemantauanService],
})
export class PemantauanModule {}
