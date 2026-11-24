import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletController } from './Application/Controllers/Wallet.controller.js';
import { WalletService } from './Application/Services/Wallet.service.js';
import { WalletSchema, WalletSchemaFactory } from './Infrastructure/Schemas/Wallet.schema.js';
import { WalletRepositoryImpl } from './Infrastructure/Repositories/Wallet.repository.impl.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: WalletSchema.name, schema: WalletSchemaFactory }]),
        AuthSharedModule,
    ],
    controllers: [WalletController],
    providers: [
        WalletService,
        { provide: 'IWalletRepository', useClass: WalletRepositoryImpl },
    ],
    exports: ['IWalletRepository'],
})
export class WalletModule {}