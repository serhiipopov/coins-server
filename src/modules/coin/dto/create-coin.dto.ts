import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCoinDto {
  @ApiProperty({ example: 'BTC', description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '60.000', description: 'Purchase price' })
  @IsNumber()
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty({
    example: "I've watched on youtube",
    description: 'Reason for purchase',
  })
  @IsOptional()
  @IsString()
  reasonForPurchase: string;

  @ApiProperty({
    example: '300',
    description: 'Average Price',
  })
  @IsOptional()
  @IsNumber()
  averagePrice: number;

  @ApiProperty({
    example: '3000',
    description: 'Selling Price',
  })
  @IsOptional()
  @IsNumber()
  sellingPrice: number;

  @ApiProperty({
    example: '3000',
    description: 'Selling Price',
  })
  @IsOptional()
  @IsString()
  reasonForSale: string;
}
