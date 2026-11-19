import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressController } from './Application/Controllers/Address.controller.js';
import { AddressService } from './Application/Services/Address.service.js';
import { AddressSchema, AddressSchemaFactory } from './Infrastructure/Schemas/Address.schema.js';
import { AddressRepositoryImpl } from './Infrastructure/Repositories/Address.repository.impl.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AddressSchema.name, schema: AddressSchemaFactory }]),
        AuthSharedModule,
    ],
    controllers: [AddressController],
    providers: [
        AddressService,
        { provide: 'IAddressRepository', useClass: AddressRepositoryImpl },
    ],
    exports:["IAddressRepository"]
})
export class AddressModule {}