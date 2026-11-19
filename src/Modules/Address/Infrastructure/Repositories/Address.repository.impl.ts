import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { IAddressRepository } from '../../Domain/Repositories/Address.repository.interface.js';
import { Address } from '../../Domain/Entities/Address.entity.js';
import { AddressSchema, AddressDocument } from '../Schemas/Address.schema.js';
import { AddressInfrastructureMapper } from '../Mappers/Address.mapper.js';

@Injectable()
export class AddressRepositoryImpl implements IAddressRepository {
    constructor(
        @InjectModel(AddressSchema.name)
        private readonly addressModel: Model<AddressDocument>,
    ) {}

    // save
    async save(address: Address): Promise<void> {
        const data = AddressInfrastructureMapper.toPersistence(address);
        await this.addressModel.updateOne(
            { _id: new ObjectId(address.getId()) },
            { $set: data },
            { upsert: true }
        );
    }

    // delete
    async delete(id: string): Promise<void> {
        await this.addressModel.deleteOne({ _id: new ObjectId(id) });
    }

    // find
    async findById(id: string): Promise<Address | null> {
        const doc = await this.addressModel.findById(id);
        return doc ? AddressInfrastructureMapper.toDomain(doc) : null;
    }

    // find user
    async findByUserId(userId: string): Promise<Address[]> {
        const docs = await this.addressModel.find({ userId });
        return docs.map(doc => AddressInfrastructureMapper.toDomain(doc));
    }

    // unset defaults
    async unsetDefaultsForUser(userId: string): Promise<void> {
        await this.addressModel.updateMany(
            { userId, isDefault: true },
            { $set: { isDefault: false } }
        );
    }
}