import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISupportRepository } from '../../Domain/Repositories/Support.repository.interface.js';
import { Ticket } from '../../Domain/Entities/Ticket.entity.js';
import { TicketMessage } from '../../Domain/Entities/TicketMessage.entity.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { TicketStatus } from '../../Domain/Enums/TicketStatus.enum.js';
@Injectable()
export class SupportService {
    constructor(
        @Inject('ISupportRepository')
        private readonly supportRepository: ISupportRepository,
    ) { }

    // create
    async createTicket(userId: string, title: string): Promise<Ticket> {
        const ticket = Ticket.create(userId, title);
        await this.supportRepository.saveTicket(ticket);
        return ticket;
    }

    // get tickets
    async getUserTickets(userId: string): Promise<Ticket[]> {
        return this.supportRepository.findTicketsByUserId(userId);
    }

    // get messages
    async getTicketMessages(ticketId: string, userId: string): Promise<TicketMessage[]> {
        const ticket = await this.supportRepository.findTicketById(ticketId);
        if (!ticket) throw new NotFoundException('Ticket not found');

        // security check (only owner or admin)
        if (ticket.getUserId() !== userId) {
            throw new NotFoundException('Ticket not found'); // return 404 for security
        }

        return this.supportRepository.findMessagesByTicketId(ticketId);
    }

    // add message
    async addMessage(ticketId: string, senderId: string, message: string, senderRole: UserRole): Promise<TicketMessage> {
        const ticket = await this.supportRepository.findTicketById(ticketId);
        if (!ticket) throw new NotFoundException('Ticket not found');
        if (
            senderRole !== UserRole.ADMIN &&
            ticket.getUserId() !== senderId
        ) {
            throw new NotFoundException('Ticket not found');
        }
        if (ticket.getStatus() === TicketStatus.CLOSED) throw new ConflictException('Ticket is closed');

        const newMessage = TicketMessage.create(ticketId, senderId, message, senderRole);
        await this.supportRepository.saveMessage(newMessage);
        return newMessage;
    }
    async authorizeTicketAccess(ticketId: string, userId: string, userRole: UserRole,): Promise<void> {
        const ticket = await this.supportRepository.findTicketById(ticketId);

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        // Admin can access every ticket
        if (userRole === UserRole.ADMIN) {
            return;
        }

        // Other roles can only access their own tickets
        if (ticket.getUserId() !== userId) {
            throw new NotFoundException('Ticket not found');
        }
    }
    //close ticket
    async closeTicket(
        ticketId: string,
        userRole: UserRole,
    ): Promise<void> {
        const ticket = await this.supportRepository.findTicketById(ticketId);

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        if (userRole !== UserRole.ADMIN) {
            throw new ForbiddenException(
                'Only administrators can close tickets',
            );
        }

        if (ticket.getStatus() === TicketStatus.CLOSED) {
            throw new ConflictException('Ticket is already closed');
        }

        ticket.close();

        await this.supportRepository.saveTicket(ticket);
    }
    //re open ticket
    async reopenTicket(
        ticketId: string,
        userRole: UserRole,
    ): Promise<void> {
        if (userRole !== UserRole.ADMIN) {
            throw new ForbiddenException(
                'Only administrators can reopen tickets',
            );
        }

        const ticket = await this.supportRepository.findTicketById(ticketId);

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        if (ticket.getStatus() !== TicketStatus.CLOSED) {
            throw new ConflictException('Only closed tickets can be reopened');
        }

        ticket.reopen();

        await this.supportRepository.saveTicket(ticket);
    }
    //re open ticket
    async inProgress(
        ticketId: string,
        userRole: UserRole,
    ): Promise<void> {
        if (userRole !== UserRole.ADMIN) {
            throw new ForbiddenException(
                'Only administrators can reopen tickets',
            );
        }

        const ticket = await this.supportRepository.findTicketById(ticketId);

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        if (ticket.getStatus() !== TicketStatus.OPEN) {
            throw new ConflictException('Only open tickets can be inprogress');
        }

        ticket.inprogress();

        await this.supportRepository.saveTicket(ticket);
    }
    //del ticket
}