import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<AddressSchema>;

@Schema({ timestamps: true, collection: 'addresses' })
export class AddressSchema {
    @Prop({ type: String, required: true, index: true })
    userId!: string;

    @Prop({ type: String, required: true })
    title!: string;

    @Prop({ type: String, required: true })
    province!: string;

    @Prop({ type: String, required: true })
    city!: string;

    @Prop({ type: String, required: true })
    street!: string;

    @Prop({ type: String, required: true })
    postalCode!: string;

    @Prop({ type: String, required: true })
    receiverName!: string;

    @Prop({ type: String, required: true })
    receiverPhone!: string;

    @Prop({ type: Boolean, default: false })
    isDefault!: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}

export const AddressSchemaFactory = SchemaFactory.createForClass(AddressSchema);