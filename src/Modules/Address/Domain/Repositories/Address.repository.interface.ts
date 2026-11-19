import { Address } from '../Entities/Address.entity.js';

export interface IAddressRepository {
    save(address: Address): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Address | null>;
    findByUserId(userId: string): Promise<Address[]>;
    unsetDefaultsForUser(userId: string): Promise<void>;
}