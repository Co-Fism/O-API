import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IReviewRepository } from '../../Domain/Repositories/Review.repository.interface.js';
import { IProductRepository } from '../../../Product/Domain/Repositories/Product.repository.interface.js'; // 👈 اضافه شد
import { ProductId } from '../../../Product/Domain/ValueObjects/ProductId.vo.js'; // 👈 اضافه شد
import { Review } from '../../Domain/Entities/Review.entity.js';
import { CreateReviewDto } from '../Dtos/CreateReview.dto.js';
import { ReviewResponseDto } from '../Dtos/ReviewResponse.dto.js';
import { ReviewResponseMapper } from '../Mappers/Review.mapper.js';

@Injectable()
export class ReviewService {
    constructor(
        @Inject('IReviewRepository')
        private readonly reviewRepository: IReviewRepository,
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
    ) {}

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
}