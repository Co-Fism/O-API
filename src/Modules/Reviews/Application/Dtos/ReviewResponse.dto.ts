import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponseDto {
    // prop
    @ApiProperty({ description: 'Review ID', example: '60d5ecb8b392d7001f3f8a12' })
    id!: string;

    // prop
    @ApiProperty({ description: 'Product ID', example: '60d5ecb8b392d7001f3f8a13' })
    productId!: string;

    // prop
    @ApiProperty({ description: 'User ID', example: '60d5ecb8b392d7001f3f8a14' })
    userId!: string;

    // prop
    @ApiProperty({ description: 'Review title', example: 'Great book!' })
    title!: string;

    // prop
    @ApiProperty({ description: 'Review body', example: 'I really enjoyed reading this.' })
    body!: string;

    // prop
    @ApiProperty({ description: 'Rating (0-5)', example: 5 })
    rating!: number;

    // prop
    @ApiProperty({ description: 'Images URLs', example: ['/uploads/img.jpg'] })
    images!: string[];

    // prop
    @ApiProperty({ description: 'List of user IDs who liked', example: ['user1', 'user2'] })
    likes!: string[];

    // prop
    @ApiProperty({ description: 'List of user IDs who disliked', example: ['user3'] })
    dislikes!: string[];

    // prop
    @ApiProperty({ description: 'Created at', example: '2026-11-13T20:37:46.578Z' })
    createdAt!: Date;
}