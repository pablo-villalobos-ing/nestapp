import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(newUser: RegisterUserDTO): Promise<void> {        
        const { nombre, mail, password } = newUser
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ nombre, mail, password: hashedPassword });
        try {
            await this.save(user);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email ya registrado');                
            }
            throw new InternalServerErrorException();
        }
        

    }
}
