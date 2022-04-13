import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { RequestResetDto } from './dto/requestResetdto.dto';
import { ResetPassword } from './dto/resetPassword.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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

    @Patch('/resetPassword')
    reset(@Body() req: RequestResetDto): Promise<void>{
        return this.authService.requestResetPassword(req);
    }

    @Patch('/validarCambio')
    validate(@Body() req : ResetPassword): Promise<void>{
        return this.authService.validateTokenPassword(req);
    }

    @Patch('/cambiarClave')
    @UseGuards(AuthGuard())
    changePassword(@Body() req: ChangePasswordDto, @GetUser() user: User): Promise<void>{
        return this.authService.changePassword(req, user);

    }

}
