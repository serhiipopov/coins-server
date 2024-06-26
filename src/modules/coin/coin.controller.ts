import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { Coin } from './coin.model';

@Controller('coin')
export class CoinController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private coinService: CoinService,
  ) {}

  @ApiOperation({ summary: 'Create coin' })
  @ApiResponse({ status: 200, type: Coin })
  @Post('/createCoin')
  async create(@Body() createCoinDto: CreateCoinDto, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const newCoin: Coin = await this.coinService.createCoin(
        createCoinDto,
        session,
      );
      await session.commitTransaction();

      return res.status(HttpStatus.CREATED).send(newCoin);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      await session.endSession();
    }
  }

  @HttpCode(200)
  @Get('/getCoin/:id')
  async findOneById(@Param('id') id: string, @Res() res: Response) {
    try {
      const coin = await this.coinService.findOneById(id);

      return res.status(HttpStatus.OK).send(coin);
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

  @Patch('/editCoin/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCoinDto: UpdateCoinDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const updatedCoin = await this.coinService.update(
        id,
        updateCoinDto,
        session,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).json(updatedCoin);
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

  @HttpCode(200)
  @Delete('/deleteCoin/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.coinService.remove(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  @Get()
  findAll() {
    return this.coinService.findAll();
  }
}
