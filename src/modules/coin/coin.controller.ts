import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { CoinModel } from './coin.model';

@Controller('coin')
export class CoinController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private coinService: CoinService,
  ) {}

  @ApiOperation({ summary: 'Create coin' })
  @ApiResponse({ status: 200, type: CoinModel })
  @Post('/createCoin')
  async create(@Body() createCoinDto: CreateCoinDto, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newCoin: any = await this.coinService.createCoin(createCoinDto);
      await session.commitTransaction();
      return res.status(HttpStatus.CREATED).send(newCoin);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      await session.endSession();
    }
  }

  @Get()
  findAll() {
    return this.coinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinDto: UpdateCoinDto) {
    return this.coinService.update(+id, updateCoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinService.remove(+id);
  }
}
