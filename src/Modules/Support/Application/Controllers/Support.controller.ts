import { Body, Controller, Get, Param, Post, UseGuards, Inject, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SupportService } from '../Services/Support.service.js';
import { JwtAuthGuard } from '../../../../Shared/Guards/JwtAuth.guard.js';
import { GetUser } from '../../../../Shared/Decorators/GetUser.decorator.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { Roles } from '../../../../Shared/Decorators/Roles.decorator.js';

@ApiTags('Support')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('support')
export class SupportController {
    constructor(@Inject(SupportService) private readonly supportService: SupportService) { }

    // create
    @ApiOperation({ summary: 'Create a new support ticket' })
    @Post('tickets')
    async createTicket(@GetUser('sub') userId: string, @Body('title') title: string) {
        return this.supportService.createTicket(userId, title);
    }

    // get list
    @ApiOperation({ summary: 'Get my tickets' })
    @Get('tickets')
    async getMyTickets(@GetUser('sub') userId: string) {
        return this.supportService.getUserTickets(userId);
    }

    // get messages
    @ApiOperation({ summary: 'Get messages of a specific ticket' })
    @Get('tickets/:id/messages')
    async getMessages(@Param('id') ticketId: string, @GetUser('sub') userId: string) {
        return this.supportService.getTicketMessages(ticketId, userId);
    }
    //close ticket
    @ApiOperation({ summary: 'Close support ticket' })
    @Roles(UserRole.ADMIN)
    @Patch('tickets/:id/close')
    async closeTicket(
        @Param('id') ticketId: string,
        @GetUser('role') userRole: UserRole,
    ) {
        await this.supportService.closeTicket(
            ticketId,
            userRole,
        );

        return {
            message: 'Ticket closed successfully',
        };
    }
    //re open ticket
    @ApiOperation({ summary: 'Reopen support ticket' })
    @Roles(UserRole.ADMIN)
    @Patch('tickets/:id/reopen')
    async reopenTicket(
        @Param('id') ticketId: string,
        @GetUser('role') userRole: UserRole,
    ) {
        await this.supportService.reopenTicket(ticketId, userRole);

        return {
            message: 'Ticket reopened successfully',
        };
    }
    //in progress ticket
    @ApiOperation({ summary: 'inprogress support ticket' })
    @Roles(UserRole.ADMIN)
    @Patch('tickets/:id/inprogress')
    async inProgressTicket(
        @Param('id') ticketId: string,
        @GetUser('role') userRole: UserRole,
    ) {
        await this.supportService.inProgress(ticketId, userRole);
        return {
            message: 'Ticket inprogress successfully',
        };
    }
}