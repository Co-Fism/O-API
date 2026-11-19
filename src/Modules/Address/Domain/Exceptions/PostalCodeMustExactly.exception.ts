import { DomainException } from "../../../../Shared/Exceptions/DomainException.js"

export class PostalCodeMustExactlyException extends DomainException{
    readonly code="ADDRESS_INVALID_POSTALCODE"
    constructor(reason?:string){
        super(reason?`ADDRESS_INVALID_POSTALCODE:${reason}`:"ADDRESS_INVALID_POSTALCODE")
    }
}
