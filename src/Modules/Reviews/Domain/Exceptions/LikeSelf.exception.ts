import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
export enum ErrorReasonLikeSelf{
    DISLIKESELF="You-cannot-dislike-your-own-review",
    LIKESELF="You-cannot-like-your-own-review"
}
export class LikeSelfException extends DomainException{
    readonly code="REVIEW_INVALID_LIKE"
    constructor(reason:ErrorReasonLikeSelf){
        super(reason?"REVIEW_INVALID_LIKE":`REVIEW_INVALID_LIKE:${reason}`)
    }
}