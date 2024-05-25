import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { Portfolio, PortfolioSchema } from './portfolio.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Portfolio.name,
        schema: PortfolioSchema,
      },
    ]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
