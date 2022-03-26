import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ) { }

    async registerUser(newUser: RegisterUserDTO): Promise<void> {
        return  this.userRepo.createUser(newUser);
        
    }
}
