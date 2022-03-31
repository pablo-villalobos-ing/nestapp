import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(nombre: string, mail: string, password: string): Promise<void> {
        const user = this.create({ nombre, mail, password });
        try {
            await this.save(user);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email ya registrado');
            }
            throw new InternalServerErrorException();
        }
    }
    async findOneByEmail(mail: string): Promise<User>{
        return await this.findOne({mail});
    }
}
