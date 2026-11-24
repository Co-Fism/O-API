import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ISupportRepository } from '../../Domain/Repositories/Support.repository.interface.js';
import { Ticket } from '../../Domain/Entities/Ticket.entity.js';
import { TicketMessage } from '../../Domain/Entities/TicketMessage.entity.js';
import { TicketSchema, TicketDocument, MessageSchema, MessageDocument } from '../Schemas/Support.schema.js';

@Injectable()
export class SupportRepositoryImpl implements ISupportRepository {
    constructor(
        @InjectModel(TicketSchema.name) private readonly ticketModel: Model<TicketDocument>,
        @InjectModel(MessageSchema.name) private readonly messageModel: Model<MessageDocument>,
    ) { }

    // ticket
    async saveTicket(ticket: Ticket): Promise<void> {
        await this.ticketModel.updateOne(
            { _id: new ObjectId(ticket.getId().toString()) },
            { $set: { userId: ticket.getUserId(), title: ticket.getTitle(), status: ticket.getStatus() } },
            { upsert: true }
        );
    }

    // find ticket
    async findTicketById(id: string): Promise<Ticket | null> {
        if (!ObjectId.isValid(id)) return null;
        const doc = await this.ticketModel.findById(id);
        if (!doc) return null;
        return Ticket.restore({ id: doc._id.toString(), userId: doc.userId, title: doc.title, status: doc.status, createdAt: doc.createdAt, updatedAt: doc.updatedAt });
    }

    // find user tickets
    async findTicketsByUserId(userId: string): Promise<Ticket[]> {
        const docs = await this.ticketModel.find({ userId }).sort({ createdAt: -1 });
        return docs.map(doc => Ticket.restore({ id: doc._id.toString(), userId: doc.userId, title: doc.title, status: doc.status, createdAt: doc.createdAt, updatedAt: doc.updatedAt }));
    }

    // message
    async saveMessage(message: TicketMessage): Promise<void> {
        await this.messageModel.create({
            _id: new ObjectId(message.getId().toString()),
            ticketId: message.getTicketId(),
            senderId: message.getSenderId(),
            message: message.getMessage(),
            senderRole: message.getSenderRole(),
        });
    }

    // find messages
    async findMessagesByTicketId(ticketId: string): Promise<TicketMessage[]> {
        const docs = await this.messageModel.find({ ticketId }).sort({ createdAt: 1 });
        return docs.map(doc => TicketMessage.restore({
            id: doc._id.toString(),
            ticketId: doc.ticketId,
            senderId: doc.senderId,
            message: doc.message,
            senderRole: doc.senderRole,
            createdAt: doc.createdAt
        }));
    }
    //find all ticket
    async findAllTickets(): Promise<Ticket[]> {
        const docs = await this.ticketModel
            .find()
            .sort({ createdAt: -1 });

        return docs.map(doc =>
            Ticket.restore({
                id: doc._id.toString(),
                userId: doc.userId,
                title: doc.title,
                status: doc.status,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt,
            })
        );
    }
    
}