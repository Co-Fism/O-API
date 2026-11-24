import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TicketStatus } from '../../Domain/Enums/TicketStatus.enum.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';

export type TicketDocument = HydratedDocument<TicketSchema>;
export type MessageDocument = HydratedDocument<MessageSchema>;

@Schema({ timestamps: true, collection: 'tickets' })
export class TicketSchema {
    @Prop({ type: String, required: true, index: true })
    userId!: string;

    @Prop({ type: String, required: true })
    title!: string;

    @Prop({ type: String, enum: TicketStatus, default: TicketStatus.OPEN })
    status!: TicketStatus;

    createdAt?: Date;
    updatedAt?: Date;
}

@Schema({ timestamps: true, collection: 'ticket_messages' })
export class MessageSchema {
    @Prop({ type: String, required: true, index: true })
    ticketId!: string;

    @Prop({ type: String, required: true })
    senderId!: string;

    @Prop({ type: String, required: true })
    message!: string;

    @Prop({
        type: String,
        enum: UserRole
    })
    senderRole!: UserRole;

    createdAt?: Date;
}

export const TicketSchemaFactory = SchemaFactory.createForClass(TicketSchema);
export const MessageSchemaFactory = SchemaFactory.createForClass(MessageSchema);