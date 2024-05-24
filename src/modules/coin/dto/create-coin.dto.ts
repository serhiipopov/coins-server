import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoinDto {
  @ApiProperty({ example: 'BTC', description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '60.000', description: 'Purchase price' })
  @IsString({ message: 'Must be a number' })
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty({
    example: "I've watched on youtube",
    description: 'Reason for purchase',
  })
  @IsOptional()
  @IsString()
  reasonForPurchase: string;
}
