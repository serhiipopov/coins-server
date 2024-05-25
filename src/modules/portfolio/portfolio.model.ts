import { Document, Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class Portfolio extends Document {
  @ApiProperty({ example: 'name', description: 'name' })
  @Prop()
  name: string;
}

export const PortfolioSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
