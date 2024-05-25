import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all portfolio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
