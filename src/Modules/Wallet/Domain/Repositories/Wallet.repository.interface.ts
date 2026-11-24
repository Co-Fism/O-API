import { Wallet } from '../Entities/Wallet.entity.js';

export interface IWalletRepository {
    save(wallet: Wallet): Promise<void>;
    findByUserId(userId: string): Promise<Wallet | null>;
}