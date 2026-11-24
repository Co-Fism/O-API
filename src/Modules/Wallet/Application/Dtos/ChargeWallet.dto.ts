import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ChargeWalletDto {
    // prop
    @ApiProperty({ description: 'Amount to charge', example: 50000 })
    @IsNumber()
    @Min(1000, { message: 'Minimum charge is 1000' })
    amount!: number;
}