import {  RatingException } from '../Exceptions/Rating.exception.js';

export class Rating {
    private constructor(private readonly value: number) {}

    static create(value: number): Rating {
        if (value < 0 || value > 5) {
            throw new RatingException("Rating must be between 0 and 5");
        }
        return new Rating(value);
    }

    getValue(): number {
        return this.value;
    }
}