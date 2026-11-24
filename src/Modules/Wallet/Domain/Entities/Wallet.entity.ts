import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { ErrorMoneyAmountReason, MoneyAmountException } from '../Exceptions/MoneyAmount.exception.js';
import { Money } from '../ValueObjects/Money.vo.js';

import { WalletId } from '../ValueObjects/WalletId.vo.js';

export class Wallet extends AggregateRoot {
    private constructor(
        private readonly id: WalletId,
        private readonly userId: string,
        private balance: Money,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) { super(); }

    // factory
    static create(userId: string): Wallet {
        return new Wallet(
            WalletId.generate(),
            userId,
            Money.create(0),
            new Date(),
            new Date()
        );
    }

    // restore
    static restore(props: any): Wallet {
        return new Wallet(
            props.id, props.userId, Money.create(props.balance),
            props.createdAt, props.updatedAt
        );
    }

    // charge
    charge(amount: number): void {
        const newBalance = this.balance.getValue() + amount;
        this.balance = Money.create(newBalance);
        this.touch();
    }

    // withdraw
    withdraw(amount: number): void {
        if (this.balance.getValue() < amount) {
            throw new MoneyAmountException(ErrorMoneyAmountReason.NOT_AVAILABLE_ENOUGH);
        }
        const newBalance = this.balance.getValue() - amount;
        this.balance = Money.create(newBalance);
        this.touch();
    }

    // touch
    private touch(): void {
        this.updatedAt = new Date();
    }

    // getters
    getId(): WalletId { return this.id; }
    getUserId(): string { return this.userId; }
    getBalance(): number { return this.balance.getValue(); }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}