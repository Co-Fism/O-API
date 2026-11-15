import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { ErrorReasonLikeSelf, LikeSelfException } from '../Exceptions/LikeSelf.exception.js';
import { Rating } from '../ValueObjects/Rating.vo.js';
import { ReviewId } from '../ValueObjects/ReviewId.vo.js';
export class Review extends AggregateRoot {
    private constructor(
        private readonly id: string,
        private readonly productId: string,
        private readonly userId: string,
        private readonly title: string,
        private readonly body: string,
        private readonly rating: Rating,
        private images: string[],
        private likes: string[],    // array of userIds
        private dislikes: string[], // array of userIds
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) { super(); }

    // factory
    static create(props: {
        productId: string;
        userId: string;
        title: string;
        body: string;
        rating: number;
        images?: string[]| undefined;
    }): Review {
        return new Review(
            ReviewId.generate().toString(),
            props.productId,
            props.userId,
            props.title,
            props.body,
            Rating.create(props.rating),
            props.images || [],
            [],
            [],
            new Date(),
            new Date()
        );
    }

    // restore
    static restore(props: any): Review {
        return new Review(
            props.id, props.productId, props.userId, props.title, props.body,
            Rating.create(props.rating), props.images, props.likes, props.dislikes,
            props.createdAt, props.updatedAt
        );
    }

    // add like
    addLike(userId: string): void {
        if (this.userId === userId) {
            throw new LikeSelfException(ErrorReasonLikeSelf.LIKESELF);
        }
        
        // remove from dislikes if exists
        this.dislikes = this.dislikes.filter(id => id !== userId);
        
        if (!this.likes.includes(userId)) {
            this.likes.push(userId);
            this.touch();
        }
    }

    // remove like
    removeLike(userId: string): void {
        this.likes = this.likes.filter(id => id !== userId);
        this.touch();
    }

    // add dislike
    addDislike(userId: string): void {
        if (this.userId === userId) {
            throw new LikeSelfException(ErrorReasonLikeSelf.DISLIKESELF);
        }
        
        // remove from likes if exists
        this.likes = this.likes.filter(id => id !== userId);
        
        if (!this.dislikes.includes(userId)) {
            this.dislikes.push(userId);
            this.touch();
        }
    }

    // remove dislike
    removeDislike(userId: string): void {
        this.dislikes = this.dislikes.filter(id => id !== userId);
        this.touch();
    }

    private touch(): void {
        this.updatedAt = new Date();
    }

    // getters
    getId(): string { return this.id; }
    getProductId(): string { return this.productId; }
    getUserId(): string { return this.userId; }
    getTitle(): string { return this.title; }
    getBody(): string { return this.body; }
    getRating(): number { return this.rating.getValue(); }
    getImages(): string[] { return this.images; }
    getLikes(): string[] { return this.likes; }
    getDislikes(): string[] { return this.dislikes; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}