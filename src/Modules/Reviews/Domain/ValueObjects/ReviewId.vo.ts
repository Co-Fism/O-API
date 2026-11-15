import { ObjectId } from "bson";
import { ErrorIdReason, InvalidIdException } from "../Exceptions/InvalidId.exception.js";

export class ReviewId {
    private constructor(private readonly value: ObjectId) {}

    static generate(): ReviewId {
        return new ReviewId(new ObjectId());
    }

    static createFromPlain(value: string): ReviewId {
        if (!value || !ObjectId.isValid(value)) {
            throw new InvalidIdException(ErrorIdReason.FORMAT);
        }
        return new ReviewId(new ObjectId(value));
    }

    getValue(): ObjectId {
        return this.value;
    }

    toString(): string {
        return this.value.toHexString();
    }

    equals(other: ReviewId): boolean {
        return this.value.equals(other.value);
    }
}
