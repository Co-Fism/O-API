import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';

export class InvalidWalletIdException extends DomainException {
    readonly code = 'WALLET_INVALID_ID';
    constructor(reason?:string) {
        super(reason?'WALLET_INVALID_ID':`WALLET_INVALID_ID:${reason}`);
    }
}
