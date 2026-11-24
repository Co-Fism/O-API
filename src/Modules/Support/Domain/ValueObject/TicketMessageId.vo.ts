import { ObjectId } from "bson";
import { ErrorSupportIdReason, InvalidSupportIdException } from "../Exceptions/InvalidCartId.exception.js";

export class TicketMessageId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): TicketMessageId {
        return new TicketMessageId(new ObjectId());
    }

    static createFromPlain(value: string): TicketMessageId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidSupportIdException(ErrorSupportIdReason.FORMAT);
        }
        return new TicketMessageId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: TicketMessageId): boolean {
        return this.value.equals(other.value);
    }
}
