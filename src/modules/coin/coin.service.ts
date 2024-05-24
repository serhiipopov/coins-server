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

  findAll() {
    return `This action returns all coin`;
  }

  async findOneById(id: string): Promise<{ coin?: Coin; message?: string }> {
    try {
      const coin: Coin = await this.coinModel.findById(id).exec();
      if (!coin) {
        return { message: 'Coin not found' };
      }

      return { coin };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return `This action updates a #${id} coin`;
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
}
