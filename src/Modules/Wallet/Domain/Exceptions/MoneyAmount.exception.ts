import { DomainException } from '../../../../Shared/Exceptions/DomainException.js';
export enum ErrorMoneyAmountReason{
    NEGATIVE="Negative",
    NOT_AVAILABLE_ENOUGH="Not-available-enough"
}
export class MoneyAmountException extends DomainException {
    readonly code = 'WALLET_INVALID_AMOUNT ';
    constructor(reason?:ErrorMoneyAmountReason) {
        super(reason?'WALLET_INVALID_AMOUNT':`WALLET_INVALID_AMOUNT:${reason}`);
    }
}
