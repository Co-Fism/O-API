import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

enum ErrorSupportIdReason{
    FORMAT="Format"
}
class InvalidSupportIdException extends DomainException{
    readonly code="SUPPORT_INVALID_ID"
    constructor(reason?:string){
        super(reason?`SUPPORT_INVALID_ID:${reason}`:"SUPPORT_INVALID_ID")
    }
}
export{InvalidSupportIdException,ErrorSupportIdReason}