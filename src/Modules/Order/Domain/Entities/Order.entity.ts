import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { OrderStatus } from '../Enums/OrderStatus.enum.js';
import { ErrorOrderStatusReason, InvalidOrderStatusException } from '../Exceptions/InvalidOrderStatus.exception.js';
import { OrderId } from '../ValueObjects/OrderId.vo.js';
import { OrderItem } from '../ValueObjects/OrderItem.vo.js';
import { ShippingAddressSnapshot } from './Order.props.js';

class Order extends AggregateRoot {
    private constructor(
        private readonly id: OrderId,
        private readonly userId: string,
        private items: OrderItem[],
        private totalPrice: number,
        private readonly addressId: string,
        private readonly shippingAddress: ShippingAddressSnapshot, 
        private status: OrderStatus,
        private paymentAuthority: string | null,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) {
        super();
    }

    static create(props: {
        userId: string;
        items: OrderItem[];
        totalPrice: number;
        addressId: string;
        shippingAddress: ShippingAddressSnapshot;
    }): Order {
        return new Order(
            OrderId.generate(),
            props.userId,
            props.items,
            props.totalPrice,
            props.addressId,
            props.shippingAddress,
            OrderStatus.PENDING,
            null,
            new Date(),
            new Date()
        );
    }
    static restore(props: any): Order {
        return new Order(
            props.id, props.userId, props.items, props.totalPrice, 
            props.addressId, props.shippingAddress,
            props.status, props.paymentAuthority, props.createdAt, props.updatedAt
        );
    }
    setPaymentAuthority(authority: string): void {
        this.paymentAuthority = authority;
        this.touch();
    }

    markAsPaid(): void {
        if (this.status !== OrderStatus.PENDING) {
            throw new InvalidOrderStatusException(ErrorOrderStatusReason.PENDING_TO_PAID);
        };
        this.status = OrderStatus.PAID;
        this.touch();
    }
    markAsProcessing(): void {
        if (this.status !== OrderStatus.PAID) {
            throw new InvalidOrderStatusException(ErrorOrderStatusReason.PAID_TO_PROCESSING);
        }
        this.status = OrderStatus.PROCESSING;
        this.touch();
    }
    markAsShipped(): void {
        if (this.status !== OrderStatus.PROCESSING) {
            throw new InvalidOrderStatusException(ErrorOrderStatusReason.PROCESSING_TO_SHIPPED);
        }
        this.status = OrderStatus.SHIPPED;
        this.touch();
    }

    markAsDelivered(): void {
        if (this.status !== OrderStatus.SHIPPED) {
            throw new InvalidOrderStatusException(ErrorOrderStatusReason.SHIPPED_TO_DELIVERED);
        }
        this.status = OrderStatus.DELIVERED;
        this.touch();
    }
    cancel(reason?: string): string | undefined {
        if (this.status === OrderStatus.DELIVERED || this.status === OrderStatus.CANCELED) {
            throw new InvalidOrderStatusException(ErrorOrderStatusReason.TO_CANCEL);
        }
        // TODO
        this.status = OrderStatus.CANCELED;
        this.touch();
        return reason
    }
    private touch(): void {
        this.updatedAt = new Date();
    }
    getId(): OrderId { return this.id; }
    getStringId(): string { return (this.id).toString() }
    getUserId(): string { return this.userId; }
    getItems(): OrderItem[] { return this.items; }
    getTotalPrice(): number { return this.totalPrice; }
    getAddressId(): string { return this.addressId; }
    getShippingAddress(): ShippingAddressSnapshot { return this.shippingAddress; }
    getStatus(): OrderStatus { return this.status; }
    getPaymentAuthority(): string | null { return this.paymentAuthority }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}
export { Order }