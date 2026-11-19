import { FileValidator } from '@nestjs/common';
import sharp from 'sharp';

export interface ImageDimensionOptions {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    allowedAspectRatios?: number[];
    ratioTolerance?: number;
}

export class ImageDimensionValidator extends FileValidator<ImageDimensionOptions> {
    constructor(options: ImageDimensionOptions) {
        super(options);
    }

    // validate
    async isValid(file?: Express.Multer.File): Promise<boolean> {
        if (!file || !file.buffer) return false;

        try {
            const metadata = await sharp(file.buffer).metadata();
            const { width, height } = metadata;

            if (!width || !height) return false;

            if (width < this.validationOptions.minWidth || width > this.validationOptions.maxWidth) return false;
            if (height < this.validationOptions.minHeight || height > this.validationOptions.maxHeight) return false;

            if (this.validationOptions.allowedAspectRatios) {
                const currentRatio = width / height;
                const tolerance = this.validationOptions.ratioTolerance || 0.05;

                const isRatioValid = this.validationOptions.allowedAspectRatios.some(
                    (allowedRatio) => Math.abs(currentRatio - allowedRatio) <= tolerance
                );

                if (!isRatioValid) return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    // error
    buildErrorMessage(): string {
        return `Image dimensions or aspect ratio are invalid. Allowed ratios: ${this.validationOptions.allowedAspectRatios?.join(', ') || 'Any'}`;
    }
}