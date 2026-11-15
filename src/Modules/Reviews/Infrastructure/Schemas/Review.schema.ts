import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewSchema>;

@Schema({ timestamps: true, collection: 'reviews' })
export class ReviewSchema {
    @Prop({ type: String, required: true, index: true })
    productId!: string;

    @Prop({ type: String, required: true })
    userId!: string;

    @Prop({ type: String, required: true })
    title!: string;

    @Prop({ type: String, required: true })
    body!: string;

    @Prop({ type: Number, required: true, min: 0, max: 5 })
    rating!: number;

    @Prop({ type: [String], default: [] })
    images!: string[];

    @Prop({ type: [String], default: [] })
    likes!: string[];

    @Prop({ type: [String], default: [] })
    dislikes!: string[];

    createdAt?: Date;
    updatedAt?: Date;
}

export const ReviewSchemaFactory = SchemaFactory.createForClass(ReviewSchema);