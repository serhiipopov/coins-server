import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({ example: 'My portfolio', description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
