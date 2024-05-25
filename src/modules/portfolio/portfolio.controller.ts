import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  BadRequestException,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './portfolio.model';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private readonly portfolioService: PortfolioService,
  ) {}

  @ApiOperation({ summary: 'Create portfolio' })
  @ApiResponse({ status: 200, type: Portfolio })
  @Post('/createPortfolio')
  async create(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const newPortfolio = await this.portfolioService.create(
        createPortfolioDto,
        session,
      );
      await session.commitTransaction();

      return res.status(HttpStatus.CREATED).send(newPortfolio);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      await session.endSession();
    }
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @HttpCode(200)
  @Get('/getPortfolio/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const portfolio = await this.portfolioService.findOne(id);

      return res.status(HttpStatus.OK).send(portfolio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: error.message });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: error.message });
      }
    }
  }

  @Patch('/editPortfolio/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const updatedPortfolio = await this.portfolioService.update(
        id,
        updatePortfolioDto,
        session,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).json(updatedPortfolio);
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    } finally {
      await session.endSession();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(+id);
  }
}
