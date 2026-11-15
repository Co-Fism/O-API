import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReviewRepository } from '../../Domain/Repositories/Review.repository.interface.js';
import { Review } from '../../Domain/Entities/Review.entity.js';
import { ReviewSchema, ReviewDocument } from '../Schemas/Review.schema.js';
import { ReviewInfrastructureMapper } from '../Mappers/Review.mapper.js';

@Injectable()
export class ReviewRepositoryImpl implements IReviewRepository {
    constructor(
        @InjectModel(ReviewSchema.name)
        private readonly reviewModel: Model<ReviewDocument>,
    ) {}

    async save(review: Review): Promise<void> {
        const data = ReviewInfrastructureMapper.toPersistence(review);
        await this.reviewModel.updateOne(
            { _id: review.getId() },
            { $set: data },
            { upsert: true }
        );
    }

    async findById(id: string): Promise<Review | null> {
        const doc = await this.reviewModel.findById(id);
        return doc ? ReviewInfrastructureMapper.toDomain(doc) : null;
    }

    async findByProductId(productId: string): Promise<Review[]> {
        const docs = await this.reviewModel.find({ productId });
        return docs.map(doc => ReviewInfrastructureMapper.toDomain(doc));
    }

    async findByUserAndProduct(userId: string, productId: string): Promise<Review | null> {
        const doc = await this.reviewModel.findOne({ userId, productId });
        return doc ? ReviewInfrastructureMapper.toDomain(doc) : null;
    }
}