import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './Application/Controllers/Review.controller.js';
import { ReviewService } from './Application/Services/Review.service.js';
import { ReviewSchema, ReviewSchemaFactory } from './Infrastructure/Schemas/Review.schema.js';
import { ReviewRepositoryImpl } from './Infrastructure/Repositories/Review.repository.impl.js';
import { AuthSharedModule } from '../../Shared/AuthShared.module.js';
import { ProductModule } from '../Product/Product.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ReviewSchema.name, schema: ReviewSchemaFactory }]),
        AuthSharedModule,
        ProductModule,
    ],
    controllers: [ReviewController],
    providers: [
        ReviewService,
        { provide: 'IReviewRepository', useClass: ReviewRepositoryImpl },
    ],
})
export class ReviewModule {}