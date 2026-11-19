import {  HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IOtpRepository } from '../../Domain/Repositories/Otp.repository.interface.js';
import { Otp } from '../../Domain/Entities/Otp.entity.js';
import { OtpChannel } from '../../Domain/Enums/OtpChannel.enum.js';
import { NotificationService } from '../../../Notification/Application/Services/Notification.service.js';
import { IUserRepository } from '../../../User/Domain/Repositories/User.repository.interface.js';
import { Phonenumber } from '../../../User/Domain/ValueObjects/Phonenumber.vo.js';
import { Email } from '../../../User/Domain/ValueObjects/Email.vo.js';
import { UserTemp } from '../../../User/Domain/Entities/User.entity.js';
import { UserRole } from '../../../User/Domain/Enums/Role.enum.js';
import { UserStatus } from '../../../User/Domain/Enums/Status.enum.js';
import {Redis} from 'ioredis';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IOtpRepository')
        private readonly otpRepository: IOtpRepository,
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('REDIS_CLIENT')
        private readonly redis: Redis,
        private readonly notificationService: NotificationService,
        private readonly jwtService: JwtService,
    ) {}

    // request
    async requestOtp(identifier: string): Promise<{ message: string }> {
        const cooldownKey = `otp_cooldown:${identifier}`;
        const isCooldown = await this.redis.get(cooldownKey);
        if (isCooldown) {
            throw new HttpException(
                'Please wait 2 minutes before requesting a new OTP.', 
                HttpStatus.TOO_MANY_REQUESTS 
            );
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await this.redis.setex(cooldownKey, 120, 'true');
        let channel = OtpChannel.SMS;
        const isPhone = /^(\+98|0098|98|0)?9[0-9]{9}$/.test(identifier);
        if (!isPhone) channel = OtpChannel.EMAIL;

        const otp = Otp.create(identifier, code, channel);
        await this.otpRepository.save(otp);

        // send
        if (channel === OtpChannel.SMS) {
            await this.notificationService.sendSms(identifier, `Your login code: ${code}`);
        } else {
            await this.notificationService.sendEmail(identifier, 'Login Code', `Your login code: ${code}`);
        }

        return { message: 'OTP sent successfully' };
    }

       // verify
    async verifyOtp(identifier: string, code: string): Promise<any> {
        const otp = await this.otpRepository.findByTarget(identifier);
        if (!otp) throw new UnauthorizedException('OTP not found or expired');
        if (otp.getCode() !== code) throw new UnauthorizedException('Invalid OTP code');

        // delete
        await this.otpRepository.deleteByTarget(identifier);

        let user: UserTemp | null = null;
        const isPhone = /^(\+98|0098|98|0)?9[0-9]{9}$/.test(identifier);
        
        if (isPhone) {
            user = await this.userRepository.findByPhone(Phonenumber.create(identifier));
        } else {
            user = await this.userRepository.findByEmail(Email.create(identifier));
        }

        if (!user) {
            user = await UserTemp.create({
                fullname: 'New User', 
                phonenumber: isPhone ? identifier : '',
                email: isPhone ? null : identifier,
                role: UserRole.USER, 
                status: UserStatus.ACTIVE,
            });
            await this.userRepository.save(user);
            
            const payload = { sub: user.getId().toString(), role: user.getRole().getValue() };
            const accessToken = await this.jwtService.signAsync(payload);

            return { 
                accessToken, 
                isNewUser: true,
                requiresPassword: false,
                message: 'Account created successfully.'
            };
        }
        const userRole = user.getRole().getValue();
        if (userRole === UserRole.ADMIN || userRole === UserRole.SELLER) {
            await this.redis.setex(`otp_verified:${user.getId().toString()}`, 300, 'true');
            return {
                accessToken: null,
                isNewUser: false,
                requiresCredentials: true,
                role: userRole,
                message: 'This account is protected. Please enter your password.'
            };
        }
        const payload = { sub: user.getId().toString(), role: userRole };
        const accessToken = await this.jwtService.signAsync(payload);

        return { 
            accessToken, 
            isNewUser: false,
            requiresPassword: false 
        };
    }
}