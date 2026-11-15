import { Body, Controller, Get, Param, Post, UseGuards, Inject, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ReviewService } from '../Services/Review.service.js';
import { CreateReviewDto } from '../Dtos/CreateReview.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
    constructor(@Inject(ReviewService) private readonly reviewService: ReviewService) { }

    // create
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a review' })
    @UseGuards(JwtAuthGuard)
    @Post()
    async createReview(@GetUser('sub') userId: string, @Body() dto: CreateReviewDto) {
        return this.reviewService.createReview(userId, dto);
    }

    // get
    @ApiOperation({ summary: 'Get reviews for a product' })
    @Get('product/:productId')
    async getProductReviews(@Param('productId') productId: string) {
        return this.reviewService.getProductReviews(productId);
    }

    // like
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Like a review' })
    @UseGuards(JwtAuthGuard)
    @Post(':id/like')
    async like(@Param('id') id: string, @GetUser('sub') userId: string) {
        return this.reviewService.likeReview(id, userId);
    }

    // dislike
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Dislike a review' })
    @UseGuards(JwtAuthGuard)
    @Post(':id/dislike')
    async dislike(@Param('id') id: string, @GetUser('sub') userId: string) {
        return this.reviewService.dislikeReview(id, userId);
    }
    // upload
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload an image for a review' })
     @ApiConsumes('multipart/form-data')
    @ApiBody({                         
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Post(':id/images')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @GetUser('sub') userId: string,
    ) {
        return this.reviewService.uploadReviewImage(id, file, userId);
    }
}