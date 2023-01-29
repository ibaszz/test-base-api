import { Module } from '@nestjs/common';
import { PemantauanService } from './pemantauan.service';
import { PemantauanController } from './pemantauan.controller';
import { HelperModule } from 'src/Common/helper';
import { DBModule } from 'src/config/db';
import { LoggerModule } from 'src/Common/logger';
import { RedisModule } from 'src/config/redis';

@Module({
  imports: [HelperModule, DBModule, LoggerModule, RedisModule],
  controllers: [PemantauanController],
  providers: [PemantauanService],
})
export class PemantauanModule {}
