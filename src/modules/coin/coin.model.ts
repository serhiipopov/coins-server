import { Document, Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class Coin extends Document {
  @ApiProperty({ example: 'name', description: 'name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'purchasePrice', description: 'purchasePrice' })
  @Prop()
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

export const CoinSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    purchasePrice: {
      type: Number,
      min: 0,
      required: true,
    },
    reasonForPurchase: {
      type: String,
    },
    averagePrice: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    reasonForSale: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
