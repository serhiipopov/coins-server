import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class CoinModel extends Document {
  @ApiProperty({ example: 'name', description: 'name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'purchasePrice', description: 'purchasePrice' })
  @Prop({ required: false })
  purchasePrice: number;

  @ApiProperty({
    example: 'reasonForPurchase',
    description: 'reasonForPurchase',
  })
  @Prop()
  reasonForPurchase: string;

  @ApiProperty({ example: 'averagePrice', description: 'averagePrice' })
  @Prop()
  averagePrice: number;

  @ApiProperty({ example: 'sellingPrice', description: 'sellingPrice' })
  @Prop()
  sellingPrice: number;

  @ApiProperty({ example: 'reasonForSale', description: 'reasonForSale' })
  @Prop()
  reasonForSale: string;
}

export const CoinSchema = SchemaFactory.createForClass(CoinModel);
