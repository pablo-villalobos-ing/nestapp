import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { userInfo } from 'os';
import {v4} from 'uuid';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(nombre: string, mail: string, password: string): Promise<void> {
        const resetPasswordToken = v4();
        const user = this.create({ nombre, mail, password, resetPasswordToken});
        try {
            await this.save(user);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email ya registrado');
            }
            throw new InternalServerErrorException();
        }
    }
    async findOneByEmail(mail: string): Promise<User> {
        const user: User = await this.findOne({ mail });
        if (!user) {
            throw new NotFoundException('Problema con el mail');
        }
        return user;
    }

    async findbyTokenPassword(resetPasswordToken: string): Promise<User> {
        const user: User = await this.findOne({ resetPasswordToken });
        if (!user) {
            throw new NotFoundException();
        }
        return user;

    }
}
