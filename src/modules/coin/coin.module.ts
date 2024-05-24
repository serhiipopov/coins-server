import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { CoinModel, CoinSchema } from './coin.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CoinModel.name,
        schema: CoinSchema,
      },
    ]),
  ],
  controllers: [CoinController],
  providers: [CoinService],
})
export class CoinModule {}
