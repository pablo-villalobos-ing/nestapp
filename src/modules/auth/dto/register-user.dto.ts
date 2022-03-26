import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class RegisterUserDTO {
    @IsNotEmpty()
    @IsString()
    @Length(2,100)
    nombre: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    @Length(5,20)
    password: string;
}