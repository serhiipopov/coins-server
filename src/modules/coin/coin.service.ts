import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CoinModel } from './coin.model';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Injectable()
export class CoinService {
  constructor(@InjectModel(CoinModel.name) private readonly coinModel: Model<CoinModel>) {}
  async createCoin(createCoinDto: CreateCoinDto) {
    const coin = await this.coinModel.create({ ...createCoinDto });
    await coin.save();

    return coin;
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
