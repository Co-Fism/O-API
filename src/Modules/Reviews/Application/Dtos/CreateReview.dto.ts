import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    // prop
    @ApiProperty({ description: 'Product ID', example: '60d5ecb8b392d7001f3f8a12' })
    @IsString()
    @IsNotEmpty()
    productId!: string;

    // prop
    @ApiProperty({ description: 'Review title', example: 'Great book!' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    // prop
    @ApiProperty({ description: 'Review body', example: 'I really enjoyed reading this.' })
    @IsString()
    @IsNotEmpty()
    body!: string;

    // prop
    @ApiProperty({ description: 'Rating (0-5)', example: 5, minimum: 0, maximum: 5 })
    @IsNumber()
    @Min(0)
    @Max(5)
    rating!: number;

    // prop
    @ApiProperty({ description: 'Images URLs', example: ['/uploads/img.jpg'], required: false })
    @IsOptional()
    @IsArray()
    images?: string[];
}