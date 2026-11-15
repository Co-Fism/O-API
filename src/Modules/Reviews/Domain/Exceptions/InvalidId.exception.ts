import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
enum ErrorIdReason{
    FORMAT="Format"
}
class InvalidIdException extends DomainException {
    readonly code = 'REVIEW_INVALID_ID';
    constructor(reason?:ErrorIdReason) {
        super(reason?'REVIEW_INVALID_ID':`REVIEW_INVALID_STOCK:${reason}`);
    }
}
export{InvalidIdException,ErrorIdReason}