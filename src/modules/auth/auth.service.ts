import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { RequestResetDto } from './dto/requestResetdto.dto';
import { ResetPassword } from './dto/resetPassword.dto';
import { EncoderService } from './encoder.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import {v4} from 'uuid';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository,
        private encodeService: EncoderService,
        private jwtService: JwtService
    ) { }

    async registerUser(newUser: RegisterUserDTO): Promise<void> {
        const { nombre, mail, password } = newUser;
        const hashedPassword = await this.encodeService.encodePassword(password);
        return this.userRepo.createUser(nombre, mail, hashedPassword);

    }

    async login(login: LoginDto): Promise<{accessToken: string}> {
        const { mail, password } = login;
        const user: User = await this.userRepo.findOneByEmail(mail);
        if ((await this.encodeService.checkPassword(password, user.password))) {
            const payload: JwtPayload = {
                id: user.idUser,
                mail: user.mail,
                activo: user.activo
            }
            const accessToken= await this.jwtService.sign(payload);
            return {accessToken};
        }
        throw new UnauthorizedException('Problema con las credenciales');
    }

   async requestResetPassword(req: RequestResetDto): Promise<void>{
    const {mail} = req;
    const user: User = await this.userRepo.findOneByEmail(mail);

    user.resetPasswordToken = v4();
    this.userRepo.save(user);

   }

   async validateTokenPassword(req: ResetPassword): Promise<void>{
    const {resetPasswordToken, password} = req;
    const user: User = await this.userRepo.findbyTokenPassword(resetPasswordToken);
    user.password = await this.encodeService.encodePassword(password);
    user.resetPasswordToken = null;
    this.userRepo.save(user);
   }

   async changePassword (res: ChangePasswordDto,user: User ): Promise<void>{
        const {oldPassword, newPassword} = res;

        if (await this.encodeService.checkPassword(oldPassword, user.password)) {
            user.password = await this.encodeService.encodePassword(newPassword);
            this.userRepo.save(user);
        } else{
            throw new BadRequestException('Datos no aceptados');
        }
   }

   private randomKey(length : number): string{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
   }

   
}
