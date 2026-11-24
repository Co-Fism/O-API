import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IReviewRepository } from '../../Domain/Repositories/Review.repository.interface.js';
import { IProductRepository } from '../../../Product/Domain/Repositories/Product.repository.interface.js';
import { ProductId } from '../../../Product/Domain/ValueObjects/ProductId.vo.js';
import { Review } from '../../Domain/Entities/Review.entity.js';
import { CreateReviewDto } from '../Dtos/CreateReview.dto.js';
import { ReviewResponseDto } from '../Dtos/ReviewResponse.dto.js';
import { ReviewResponseMapper } from '../Mappers/Review.mapper.js';
import { IStorageService } from '../../../../Shared/Storage/IStorage.service.js';

@Injectable()
export class ReviewService {
    constructor(
        @Inject('IReviewRepository')
        private readonly reviewRepository: IReviewRepository,
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('IStorageService')
        private readonly storageService: IStorageService,
    ) { }

    // create
    async createReview(userId: string, dto: CreateReviewDto): Promise<ReviewResponseDto> {
        const product = await this.productRepository.findById(ProductId.createFromPlain(dto.productId));
        if (!product) {
            throw new NotFoundException('Product not found. Cannot create a review for a non-existent product.');
        }
        const existing = await this.reviewRepository.findByUserAndProduct(userId, dto.productId);
        if (existing) {
            throw new BadRequestException('You have already reviewed this product.');
        }
        const review = Review.create({
            productId: dto.productId,
            userId: userId,
            title: dto.title,
            body: dto.body,
            rating: dto.rating,
            images: dto.images,
        });

        await this.reviewRepository.save(review);
        return ReviewResponseMapper.toResponse(review);
    }

    // get
    async getProductReviews(productId: string): Promise<ReviewResponseDto[]> {
        const reviews = await this.reviewRepository.findByProductId(productId);
        return ReviewResponseMapper.toResponseList(reviews); // mapper
    }

    // like
    async likeReview(reviewId: string, userId: string): Promise<ReviewResponseDto> {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) throw new NotFoundException('Review not found');

        review.addLike(userId);
        await this.reviewRepository.save(review);
        return ReviewResponseMapper.toResponse(review); // mapper
    }

    // dislike
    async dislikeReview(reviewId: string, userId: string): Promise<ReviewResponseDto> {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) throw new NotFoundException('Review not found');

        review.addDislike(userId);
        await this.reviewRepository.save(review);
        return ReviewResponseMapper.toResponse(review); // mapper
    }
    async removeLike(reviewId: string, userId: string): Promise<ReviewResponseDto> {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) throw new NotFoundException('Review not found');

        review.removeLike(userId);
        await this.reviewRepository.save(review);

        return ReviewResponseMapper.toResponse(review);
    }

    // remove dislike
    async removeDislike(reviewId: string, userId: string): Promise<ReviewResponseDto> {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) throw new NotFoundException('Review not found');

        review.removeDislike(userId);
        await this.reviewRepository.save(review);

        return ReviewResponseMapper.toResponse(review);
    }
    // upload image
    async uploadReviewImage(
        reviewId: string,
        file: Express.Multer.File,
        userId: string
    ): Promise<ReviewResponseDto> {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) throw new NotFoundException('Review not found');
        if (review.getUserId() !== userId) {
            throw new ForbiddenException('You can only add images to your own reviews');
        }
        const imageUrl = await this.storageService.uploadFile(file, 'reviews');

        review.addImage(imageUrl);

        await this.reviewRepository.save(review);
        return ReviewResponseMapper.toResponse(review);
    }
}