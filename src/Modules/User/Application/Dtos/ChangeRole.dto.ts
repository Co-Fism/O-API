import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from './../../Domain/Enums/Role.enum.js';
import { ApiProperty } from '@nestjs/swagger';
const AllowedRolesForChangeNoParams: Extract<UserRole,UserRole.USER>[] = [
  UserRole.USER
];
class ChangeRoleDto {
    @ApiProperty({ description: 'Change user role', example: 'USER',enum:AllowedRolesForChangeNoParams }) 
    @IsNotEmpty()
    @IsEnum(AllowedRolesForChangeNoParams)
    newRole!: UserRole;
}
export{ChangeRoleDto}