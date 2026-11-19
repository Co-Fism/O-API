import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

class CheckoutDto {
    @ApiProperty({ description: 'shipping Address for check', example: 'tehran ss fsd dfs' })
    @IsString()
    @IsNotEmpty()
    shippingAddress!: string;
    @ApiProperty({ 
        description: 'Shipping Address ID', 
        example: '60d5ecb8b392d7001f3f8a12' 
    })
    @IsMongoId({ message: 'Invalid Address ID' })
    @IsNotEmpty()
    addressId!: string;
}
export { CheckoutDto }