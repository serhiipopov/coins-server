import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Coin } from './coin.model';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Injectable()
export class CoinService {
  constructor(
    @InjectModel(Coin.name) private readonly coinModel: Model<Coin>,
  ) {}
  async createCoin(createCoinDto: CreateCoinDto, session: ClientSession) {
    const coin = await this.coinModel.create({
      name: createCoinDto.name,
      purchasePrice: createCoinDto.purchasePrice,
      reasonForPurchase: createCoinDto.reasonForPurchase,
    });

    return await coin.save({ session });
  }

  findAll() {
    return `This action returns all coin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coin`;
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return `This action updates a #${id} coin`;
  }

  remove(id: number) {
    return `This action removes a #${id} coin`;
  }
}
