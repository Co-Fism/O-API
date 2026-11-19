import { OrderStatus } from "../Enums/OrderStatus.enum.js";
import { OrderItem } from "../ValueObjects/OrderItem.vo.js";

export interface ShippingAddressSnapshot {
    province: string;
    city: string;
    street: string;
    postalCode: string;
    receiverName: string;
    receiverPhone: string;
}

export interface CreateOrderProps {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    addressId: string;
    shippingAddress: ShippingAddressSnapshot;
}

export interface RestoreOrderProps {
    id: string;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    addressId: string;
    shippingAddress: ShippingAddressSnapshot;
    status: OrderStatus;
    paymentAuthority: string | null;
    createdAt: Date;
    updatedAt?: Date;
}