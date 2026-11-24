import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<WalletSchema>;

@Schema({ timestamps: true, collection: 'wallets' })
export class WalletSchema {
    @Prop({ type: String, required: true, unique: true })
    userId!: string;

    @Prop({ type: Number, default: 0 })
    balance!: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export const WalletSchemaFactory = SchemaFactory.createForClass(WalletSchema);