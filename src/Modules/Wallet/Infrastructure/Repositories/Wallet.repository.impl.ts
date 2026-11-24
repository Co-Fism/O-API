import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { IWalletRepository } from '../../Domain/Repositories/Wallet.repository.interface.js';
import { Wallet } from '../../Domain/Entities/Wallet.entity.js';
import { WalletSchema, WalletDocument } from '../Schemas/Wallet.schema.js';

@Injectable()
export class WalletRepositoryImpl implements IWalletRepository {
    constructor(
        @InjectModel(WalletSchema.name)
        private readonly walletModel: Model<WalletDocument>,
    ) {}

    // save
    async save(wallet: Wallet): Promise<void> {
        await this.walletModel.updateOne(
            { _id: new ObjectId(wallet.getId().toString()) },
            { $set: {
                userId: wallet.getUserId(),
                balance: wallet.getBalance(),
            } },
            { upsert: true }
        );
    }

    // find
    async findByUserId(userId: string): Promise<Wallet | null> {
        const doc = await this.walletModel.findOne({ userId });
        if (!doc) return null;
        
        return Wallet.restore({
            id: doc._id.toString(),
            userId: doc.userId,
            balance: doc.balance,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }
}