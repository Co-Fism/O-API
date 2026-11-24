import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../../Domain/Repositories/Wallet.repository.interface.js';
import { Wallet } from '../../Domain/Entities/Wallet.entity.js';

@Injectable()
export class WalletService {
    constructor(
        @Inject('IWalletRepository')
        private readonly walletRepository: IWalletRepository,
    ) {}

    // get
    async getWallet(userId: string): Promise<Wallet> {
        let wallet = await this.walletRepository.findByUserId(userId);

        if (!wallet) {
            wallet = Wallet.create(userId);
            await this.walletRepository.save(wallet);
        }
        return wallet;
    }

    // charge
    async chargeWallet(userId: string, amount: number): Promise<Wallet> {
        const wallet = await this.getWallet(userId);
        wallet.charge(amount);
        await this.walletRepository.save(wallet);
        return wallet;
    }

    // withdraw
    async withdraw(userId: string, amount: number): Promise<Wallet> {
        const wallet = await this.getWallet(userId);
        wallet.withdraw(amount);
        await this.walletRepository.save(wallet);
        return wallet;
    }
}