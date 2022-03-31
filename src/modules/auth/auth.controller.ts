import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/register')
    register(@Body() newUser: RegisterUserDTO){
        if (newUser.nombre.length > 0 && newUser.mail.length > 0 && newUser.password.length > 0) {
            return this.authService.registerUser(newUser);
        } else {
            return "campos no cumplen lo requerido";
        }
    }
    @Post('/login')
    login(@Body() login: LoginDto): Promise<{accessToken: string}>{
        return this.authService.login(login);
    }

}
