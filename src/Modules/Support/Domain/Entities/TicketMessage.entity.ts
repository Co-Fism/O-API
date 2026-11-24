import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { TicketMessageId } from '../ValueObject/TicketMessageId.vo.js';


export class TicketMessage extends AggregateRoot {
    private constructor(
        private readonly id: TicketMessageId,
        private readonly ticketId: string,
        private readonly senderId: string,
        private readonly message: string,
        private readonly senderRole: UserRole,
        private readonly createdAt: Date,
    ) { super(); }

    // factory
    static create(ticketId: string, senderId: string, message: string, senderRole: UserRole): TicketMessage {
        return new TicketMessage(
            TicketMessageId.generate(),
            ticketId,
            senderId,
            message,
            senderRole,
            new Date()
        );
    }

    // restore
    static restore(props: any): TicketMessage {
        return new TicketMessage(
            props.id, props.ticketId, props.senderId, props.message,
            props.senderRole, props.createdAt
        );
    }

    // getters
    getId(): TicketMessageId { return this.id; }
    getTicketId(): string { return this.ticketId; }
    getSenderId(): string { return this.senderId; }
    getMessage(): string { return this.message; }
    getSenderRole(): UserRole { return this.senderRole; }
    getCreatedAt(): Date { return this.createdAt; }
}