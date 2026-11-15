import { Review } from '../Entities/Review.entity.js';

export interface IReviewRepository {
    save(review: Review): Promise<void>;
    findById(id: string): Promise<Review | null>;
    findByProductId(productId: string): Promise<Review[]>;
    findByUserAndProduct(userId: string, productId: string): Promise<Review | null>;
}