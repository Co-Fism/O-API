import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAddressRepository } from '../../Domain/Repositories/Address.repository.interface.js';
import { Address } from '../../Domain/Entities/Address.entity.js';
import { CreateAddressDto } from '../Dtos/CreateAddress.dto.js';
import { AddressResponseDto } from '../Dtos/AddressResponse.dto.js';

@Injectable()
export class AddressService {
    constructor(
        @Inject('IAddressRepository')
        private readonly addressRepository: IAddressRepository,
    ) {}

    // create
    async createAddress(userId: string, dto: CreateAddressDto): Promise<AddressResponseDto> {
        if (dto.isDefault) {
            await this.addressRepository.unsetDefaultsForUser(userId);
        }

        const address = Address.create({ ...dto, userId });
        await this.addressRepository.save(address);
        return this.mapToResponse(address);
    }

    // get
    async getUserAddresses(userId: string): Promise<AddressResponseDto[]> {
        const addresses = await this.addressRepository.findByUserId(userId);
        return addresses.map(a => this.mapToResponse(a));
    }

    // set default
    async setDefaultAddress(userId: string, addressId: string): Promise<AddressResponseDto> {
        const address = await this.addressRepository.findById(addressId);
        if (!address || address.getUserId() !== userId) {
            throw new NotFoundException('Address not found');
        }

        await this.addressRepository.unsetDefaultsForUser(userId);
        
        address.markAsDefault();
        await this.addressRepository.save(address);
        return this.mapToResponse(address);
    }

    // delete
    async deleteAddress(userId: string, addressId: string): Promise<{ message: string }> {
        const address = await this.addressRepository.findById(addressId);
        if (!address || address.getUserId() !== userId) {
            throw new NotFoundException('Address not found');
        }
        await this.addressRepository.delete(addressId);
        return { message: 'Address deleted successfully' };
    }

    // mapper
    private mapToResponse(address: Address): AddressResponseDto {
        const dto = new AddressResponseDto();
        dto.id = address.getId();
        dto.userId = address.getUserId();
        dto.title = address.getTitle();
        dto.province = address.getProvince();
        dto.city = address.getCity();
        dto.street = address.getStreet();
        dto.postalCode = address.getPostalCode();
        dto.receiverName = address.getReceiverName();
        dto.receiverPhone = address.getReceiverPhone();
        dto.isDefault = address.getIsDefault();
        return dto;
    }
}