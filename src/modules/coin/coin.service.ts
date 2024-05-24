import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async findOneById(id: string): Promise<Coin> {
    try {
      const coin: Coin = await this.coinModel.findById(id).exec();
      return coin;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateCoinDto: UpdateCoinDto,
    session: ClientSession,
  ) {
    let coin: Coin;

    try {
      coin = await this.coinModel.findOne({ _id: id });

      coin.name = updateCoinDto.name ?? coin.name;
      coin.purchasePrice = updateCoinDto.purchasePrice ?? coin.purchasePrice;
      coin.reasonForPurchase =
        updateCoinDto.reasonForPurchase ?? coin.reasonForPurchase;
      coin.sellingPrice = updateCoinDto.sellingPrice ?? coin.sellingPrice;
      coin.reasonForSale = updateCoinDto.reasonForSale ?? coin.reasonForSale;

      await coin.save({ session });
      return coin;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    const coin = await this.findOneById(id);

    try {
      if (coin) {
        await this.coinModel.deleteOne({ _id: id }).exec();
        return { message: 'Coin successfully deleted' };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all coin`;
  }
}
