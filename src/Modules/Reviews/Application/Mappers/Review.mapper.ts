import { Review } from '../../Domain/Entities/Review.entity.js';
import { ReviewResponseDto } from '../Dtos/ReviewResponse.dto.js';

export class ReviewResponseMapper {
    // response
    static toResponse(review: Review): ReviewResponseDto {
        const dto = new ReviewResponseDto();
        dto.id = review.getId();
        dto.productId = review.getProductId();
        dto.userId = review.getUserId();
        dto.title = review.getTitle();
        dto.body = review.getBody();
        dto.rating = review.getRating();
        dto.images = review.getImages();
        dto.likes = review.getLikes();
        dto.dislikes = review.getDislikes();
        dto.createdAt = review.getCreatedAt();
        return dto;
    }

    // list
    static toResponseList(reviews: Review[]): ReviewResponseDto[] {
        return reviews.map(review => ReviewResponseMapper.toResponse(review));
    }
}