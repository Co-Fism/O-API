import { Ticket } from '../Entities/Ticket.entity.js';
import { TicketMessage } from '../Entities/TicketMessage.entity.js';

export interface ISupportRepository {
    saveTicket(ticket: Ticket): Promise<void>;
    findTicketById(id: string): Promise<Ticket | null>;
    findTicketsByUserId(userId: string): Promise<Ticket[]>;
    saveMessage(message: TicketMessage): Promise<void>;
    findMessagesByTicketId(ticketId: string): Promise<TicketMessage[]>;
    findAllTickets(): Promise<Ticket[]>;
}