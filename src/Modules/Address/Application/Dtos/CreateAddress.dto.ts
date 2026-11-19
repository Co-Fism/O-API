import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
    // prop
    @ApiProperty({ description: 'Address title', example: 'Home' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    // prop
    @ApiProperty({ description: 'Province', example: 'Tehran' })
    @IsString()
    @IsNotEmpty()
    province!: string;

    // prop
    @ApiProperty({ description: 'City', example: 'Tehran' })
    @IsString()
    @IsNotEmpty()
    city!: string;

    // prop
    @ApiProperty({ description: 'Street address', example: 'Valiasr St, No. 12' })
    @IsString()
    @IsNotEmpty()
    street!: string;

    // prop
    @ApiProperty({ description: 'Postal code', example: '1234567890' })
    @IsString()
    @Length(10, 10)
    postalCode!: string;

    // prop
    @ApiProperty({ description: 'Receiver name', example: 'Ali Ahmadi' })
    @IsString()
    @IsNotEmpty()
    receiverName!: string;

    // prop
    @ApiProperty({ description: 'Receiver phone', example: '09123456789' })
    @IsString()
    @IsNotEmpty()
    receiverPhone!: string;

    // prop
    @ApiProperty({ description: 'Is default address?', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}