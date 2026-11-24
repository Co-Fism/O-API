import { ObjectId } from "bson";
import { ErrorSupportIdReason, InvalidSupportIdException } from "../Exceptions/InvalidCartId.exception.js";

export class TicketId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): TicketId {
        return new TicketId(new ObjectId());
    }

    static createFromPlain(value: string): TicketId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidSupportIdException(ErrorSupportIdReason.FORMAT);
        }
        return new TicketId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: TicketId): boolean {
        return this.value.equals(other.value);
    }
}
