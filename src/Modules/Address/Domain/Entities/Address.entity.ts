import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { ObjectId } from 'bson';
import { PostalCode } from '../ValueObjects/PostalCode.vo.js';

export class Address extends AggregateRoot {
    private constructor(
        private readonly id: string,
        private readonly userId: string,
        private title: string, // e.g., Home, Work
        private province: string,
        private city: string,
        private street: string,
        private postalCode: PostalCode,
        private receiverName: string,
        private receiverPhone: string,
        private isDefault: boolean,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) { super(); }

    // factory
    static create(props: {
        userId: string;
        title: string;
        province: string;
        city: string;
        street: string;
        postalCode: string;
        receiverName: string;
        receiverPhone: string;
        isDefault?: boolean;
    }): Address {
        return new Address(
            new ObjectId().toString(),
            props.userId,
            props.title,
            props.province,
            props.city,
            props.street,
            PostalCode.create(props.postalCode),
            props.receiverName,
            props.receiverPhone,
            props.isDefault || false,
            new Date(),
            new Date()
        );
    }

    // restore
    static restore(props: any): Address {
        return new Address(
            props.id, props.userId, props.title, props.province, props.city,
            props.street, PostalCode.create(props.postalCode), props.receiverName,
            props.receiverPhone, props.isDefault, props.createdAt, props.updatedAt
        );
    }

    // set default
    markAsDefault(): void {
        this.isDefault = true;
        this.touch();
    }

    // unset default
    unmarkAsDefault(): void {
        this.isDefault = false;
        this.touch();
    }

    // update
    update(props: {
        title?: string;
        province?: string;
        city?: string;
        street?: string;
        postalCode?: string;
        receiverName?: string;
        receiverPhone?: string;
    }): void {
        if (props.title) this.title = props.title;
        if (props.province) this.province = props.province;
        if (props.city) this.city = props.city;
        if (props.street) this.street = props.street;
        if (props.postalCode) this.postalCode = PostalCode.create(props.postalCode);
        if (props.receiverName) this.receiverName = props.receiverName;
        if (props.receiverPhone) this.receiverPhone = props.receiverPhone;
        this.touch();
    }

    // touch
    private touch(): void {
        this.updatedAt = new Date();
    }

    // getters
    getId(): string { return this.id; }
    getUserId(): string { return this.userId; }
    getTitle(): string { return this.title; }
    getProvince(): string { return this.province; }
    getCity(): string { return this.city; }
    getStreet(): string { return this.street; }
    getPostalCode(): string { return this.postalCode.getValue(); }
    getReceiverName(): string { return this.receiverName; }
    getReceiverPhone(): string { return this.receiverPhone; }
    getIsDefault(): boolean { return this.isDefault; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}