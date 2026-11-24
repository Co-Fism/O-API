import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportController } from './Application/Controllers/Support.controller.js';
import { SupportService } from './Application/Services/Support.service.js';
import { SupportGateway } from './Infrastructure/Gateways/Support.gateway.js';
import { SupportRepositoryImpl } from './Infrastructure/Repositories/Support.repository.impl.js';
import { TicketSchema, TicketSchemaFactory, MessageSchema, MessageSchemaFactory } from './Infrastructure/Schemas/Support.schema.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
import { WsJwtGuard } from '../../Shared/Guards/WsJwt.guard.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TicketSchema.name, schema: TicketSchemaFactory },
            { name: MessageSchema.name, schema: MessageSchemaFactory },
        ]),
        AuthSharedModule,
    ],
    controllers: [SupportController],
    providers: [
        SupportService,
        SupportGateway,
        WsJwtGuard,
        { provide: 'ISupportRepository', useClass: SupportRepositoryImpl },
    ],
})
export class SupportModule { }