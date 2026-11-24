import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportService } from '../../Application/Services/Support.service.js';
import {  Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../../../../Shared/Guards/WsJwt.guard.js';
import { isValidObjectId } from 'mongoose';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';



@WebSocketGateway({
    cors: { origin: '*' }, // development only
    namespace: 'support',
})
export class SupportGateway {
    @WebSocketServer()
    server!: Server;

    private readonly logger = new Logger(SupportGateway.name);

    constructor(
        private readonly supportService: SupportService,
        
    ) { }

    // join
    @UseGuards(WsJwtGuard)
    @SubscribeMessage('join_ticket')
    async handleJoinTicket(
        @MessageBody() data: { ticketId: string },
        @ConnectedSocket() client: Socket,
    ) {
        try {
            if (!data?.ticketId || !isValidObjectId(data.ticketId)) {
                throw new WsException('Invalid ticket ID');
            }
            
            const user = client.data.user;

            await this.supportService.authorizeTicketAccess(
                data.ticketId,
                user.sub,
                user.role as UserRole,
            );

            // Join only after authorization
            await client.join(`ticket_${data.ticketId}`);

            this.logger.log(
                `Client ${user.sub} joined ticket ${data.ticketId}`,
            );

            return { status: 'joined' };

        } catch (error: unknown) {
            if (error instanceof WsException) {
                throw error;
            }

            if (error instanceof NotFoundException) {
                throw new WsException('Ticket not found');
            }

            this.logger.error('Failed to join ticket');
            throw new WsException('Failed to join ticket');
        }
    }

    // message
    @UseGuards(WsJwtGuard)
    @SubscribeMessage('send_message')
    async handleMessage(
        @MessageBody() data: { ticketId: string; message: string; },
        @ConnectedSocket() client: Socket,
    ): Promise<{ status: string }> {
        console.log("Message included");
        try {
            // save to db
            const user = client.data.user;
            const senderId = user.sub;
            const senderRole = user.role;
            const savedMessage = await this.supportService.addMessage(
                data.ticketId,
                senderId,
                data.message,
                senderRole
            );

            // broadcast to room
            this.server.to(`ticket_${data.ticketId}`).emit('receive_message', {
                id: savedMessage.getId().toString(),
                senderId: savedMessage.getSenderId(),
                message: savedMessage.getMessage(),
                senderRole: savedMessage.getSenderRole(),
                createdAt: savedMessage.getCreatedAt(),
            });
            return { status: `Message sent successfully.` };
        } catch (error: any) {
            this.logger.error(`Failed to send message: ${error.message}`, error.stack);
            if (error instanceof NotFoundException) {
                throw new WsException('Ticket not found');
            }
            if (error.message === 'Ticket is closed') {
                throw new WsException('Cannot send message to a closed ticket');
            }
            throw new WsException('Failed to send message');
        }
    }
}