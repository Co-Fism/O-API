import { ErrorMoneyAmountReason, MoneyAmountException } from "../Exceptions/MoneyAmount.exception.js";

export class Money {
    private constructor(private readonly amount: number) {}

    // create
    static create(amount: number): Money {
        if (amount < 0) {
            throw new MoneyAmountException(ErrorMoneyAmountReason.NEGATIVE);
        }
        return new Money(amount);
    }

    // get
    getValue(): number {
        return this.amount;
    }
}