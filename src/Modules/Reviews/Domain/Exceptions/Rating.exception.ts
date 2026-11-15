import { DomainException } from "../../../../Shared/Exceptions/DomainException.js";

export class RatingException extends DomainException{
    readonly code="REVIEW_INVALID_RATING"
    constructor(reason?:string){
        super(reason?"REVIEW_INVALID_RATING":`REVIEW_INVALID_RATING:${reason}`)
    }
}