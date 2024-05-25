import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto, session: ClientSession) {
    const portfolio = await this.portfolioModel.create({
      name: createPortfolioDto.name,
    });

    return await portfolio.save({ session });
  }

  async findOne(id: string): Promise<Portfolio> {
    try {
      return await this.portfolioModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }

  findAll() {
    return `This action returns all portfolio`;
  }
}
