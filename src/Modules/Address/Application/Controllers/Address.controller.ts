import { Body, Controller, Delete, Get, Param, Post, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AddressService } from '../Services/Address.service.js';
import { CreateAddressDto } from '../Dtos/CreateAddress.dto.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';

@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressController {
    constructor(@Inject(AddressService) private readonly addressService: AddressService) {}

    // create
    @ApiOperation({ summary: 'Create a new address' })
    @Post()
    async create(@GetUser('sub') userId: string, @Body() dto: CreateAddressDto) {
        return this.addressService.createAddress(userId, dto);
    }

    // get all
    @ApiOperation({ summary: 'Get all addresses for current user' })
    @Get()
    async getAll(@GetUser('sub') userId: string) {
        return this.addressService.getUserAddresses(userId);
    }

    // set default
    @ApiOperation({ summary: 'Set an address as default' })
    @Post(':id/default')
    async setDefault(@Param('id') id: string, @GetUser('sub') userId: string) {
        return this.addressService.setDefaultAddress(userId, id);
    }

    // delete
    @ApiOperation({ summary: 'Delete an address' })
    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('sub') userId: string) {
        return this.addressService.deleteAddress(userId, id);
    }
}