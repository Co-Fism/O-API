import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { TicketStatus } from '../Enums/TicketStatus.enum.js';
import { TicketId } from '../ValueObject/TicketId.vo.js';

export class Ticket extends AggregateRoot {
    private constructor(
        private readonly id: TicketId,
        private readonly userId: string,
        private title: string,
        private status: TicketStatus,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) { super(); }

    // factory
    static create(userId: string, title: string): Ticket {
        return new Ticket(
            TicketId.generate(),
            userId,
            title,
            TicketStatus.OPEN,
            new Date(),
            new Date()
        );
    }

    // restore
    static restore(props: any): Ticket {
        return new Ticket(
            props.id, props.userId, props.title, props.status,
            props.createdAt, props.updatedAt
        );
    }

    // close
    close() {
        if (this.status === TicketStatus.CLOSED) {
            throw new Error('Ticket is already closed');
        }
        this.status = TicketStatus.CLOSED;
        this.touch();

    }
    //reopen
    reopen(): void {
        if (this.status === TicketStatus.OPEN) {
            throw new Error('Only not opened tickets can be reopened');
        }

        this.status = TicketStatus.OPEN;
        this.touch();
    }
    //inprogress
    inprogress(): void {
        if (this.status !== TicketStatus.OPEN) {
            throw new Error('Only open tickets can be inprogress');
        }

        this.status = TicketStatus.IN_PROGRESS;
        this.touch();
    }
    // touch
    private touch(): void {
        this.updatedAt = new Date();
    }

    // getters
    getId(): TicketId { return this.id; }
    getUserId(): string { return this.userId; }
    getTitle(): string { return this.title; }
    getStatus(): TicketStatus { return this.status; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }
}