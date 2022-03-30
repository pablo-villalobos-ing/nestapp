import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository,
        private encodeService: EncoderService
    ) { }

    async registerUser(newUser: RegisterUserDTO): Promise<void> {
        const {nombre, mail, password} = newUser;
        const hashedPassword = await this.encodeService.encodePassword(password);
        return  this.userRepo.createUser(nombre, mail, hashedPassword);
        
    }
}
