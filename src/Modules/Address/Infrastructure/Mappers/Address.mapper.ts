import { AddressDocument } from '../Schemas/Address.schema.js';
import { Address } from '../../Domain/Entities/Address.entity.js';

export class AddressInfrastructureMapper {
    // to domain
    static toDomain(doc: AddressDocument): Address {
        return Address.restore({
            id: doc._id.toString(),
            userId: doc.userId,
            title: doc.title,
            province: doc.province,
            city: doc.city,
            street: doc.street,
            postalCode: doc.postalCode,
            receiverName: doc.receiverName,
            receiverPhone: doc.receiverPhone,
            isDefault: doc.isDefault,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }

    // to persistence
    static toPersistence(address: Address): any {
        return {
            userId: address.getUserId(),
            title: address.getTitle(),
            province: address.getProvince(),
            city: address.getCity(),
            street: address.getStreet(),
            postalCode: address.getPostalCode(),
            receiverName: address.getReceiverName(),
            receiverPhone: address.getReceiverPhone(),
            isDefault: address.getIsDefault(),
        };
    }
}