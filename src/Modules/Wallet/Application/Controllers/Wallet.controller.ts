import { Body, Controller, Get, Post, UseGuards, Inject, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WalletService } from '../Services/Wallet.service.js';
import { ChargeWalletDto } from '../Dtos/ChargeWallet.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';
import { RolesGuard } from '../../../../Shared/Guards/Roles.guard.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { Roles } from '../../../../Shared/Decorators/Roles.decorator.js';

@ApiTags('Wallets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletController {
    constructor(@Inject(WalletService) private readonly walletService: WalletService) {}

    // get
    @ApiOperation({ summary: 'Get current user wallet' })
    @Get('me')
    async getWallet(@GetUser('sub') userId: string) {
        return this.walletService.getWallet(userId);
    }

    // charge
    @ApiOperation({ summary: 'Charge wallet (Mock payment)' })
    @Post('charge')
    async charge(@GetUser('sub') userId: string, @Body() dto: ChargeWalletDto) {
        return this.walletService.chargeWallet(userId, dto.amount);
    }
    //deCharge
    @ApiOperation({ summary: 'Withdraw amount from user wallet (Admin only)' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch('admin/:userId/withdraw')
    async adminWithdraw(
        @Param('userId') targetUserId: string,
        @Body() dto: ChargeWalletDto,
    ) {
        return this.walletService.withdraw(targetUserId, dto.amount);
    }
}