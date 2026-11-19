import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
    @ApiProperty() id!: string;
    @ApiProperty() userId!: string;
    @ApiProperty() title!: string;
    @ApiProperty() province!: string;
    @ApiProperty() city!: string;
    @ApiProperty() street!: string;
    @ApiProperty() postalCode!: string;
    @ApiProperty() receiverName!: string;
    @ApiProperty() receiverPhone!: string;
    @ApiProperty() isDefault!: boolean;
}