import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";
export enum ErrorReasonImagesPerReview{
    MAXPER='Maximum 5 images allowed per review'
}
export class ImagesPerReviewException extends DomainException{
    readonly code="REVIEW_INVALID_IMAGE"
    constructor(reason:ErrorReasonImagesPerReview){
        super(reason?"REVIEW_INVALID_IMAGE":`REVIEW_INVALID_IMAGE:${reason}`)
    }
}