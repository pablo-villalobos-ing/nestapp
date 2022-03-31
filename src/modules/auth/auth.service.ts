import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

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
        const user = await this.userRepo.findOneByEmail(mail);
        if (user && (await this.encodeService.checkPassword(password, user.password))) {
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
}
