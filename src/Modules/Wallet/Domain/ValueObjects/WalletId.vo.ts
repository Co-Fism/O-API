import { ObjectId } from "bson";
import {  InvalidWalletIdException } from "../Exceptions/InvalidWalletId.exception.js";

export class WalletId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): WalletId {
        return new WalletId(new ObjectId());
    }

    static createFromPlain(value: string): WalletId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidWalletIdException("FORMAT");
        }
        return new WalletId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: WalletId): boolean {
        return this.value.equals(other.value);
    }
}
