import { ReviewDocument } from '../Schemas/Review.schema.js';
import { Review } from '../../Domain/Entities/Review.entity.js';

export class ReviewInfrastructureMapper {
    static toDomain(doc: ReviewDocument): Review {
        return Review.restore({
            id: doc._id.toString(),
            productId: doc.productId,
            userId: doc.userId,
            title: doc.title,
            body: doc.body,
            rating: doc.rating,
            images: doc.images,
            likes: doc.likes,
            dislikes: doc.dislikes,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    static toPersistence(review: Review): any {
        return {
            productId: review.getProductId(),
            userId: review.getUserId(),
            title: review.getTitle(),
            body: review.getBody(),
            rating: review.getRating(),
            images: review.getImages(),
            likes: review.getLikes(),
            dislikes: review.getDislikes(),
        };
    }
}