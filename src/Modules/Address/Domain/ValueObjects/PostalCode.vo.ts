import { PostalCodeMustExactlyException } from "../Exceptions/PostalCodeMustExactly.exception.js";


export class PostalCode {
    private constructor(private readonly value: string) {}

    // create
    static create(value: string): PostalCode {
        const normalized = value?.trim();
        if (!normalized || !/^\d{10}$/.test(normalized)) {
            throw new PostalCodeMustExactlyException('Postal code must be exactly 10 digits.');
        }
        return new PostalCode(normalized);
    }

    // get
    getValue(): string {
        return this.value;
    }
}