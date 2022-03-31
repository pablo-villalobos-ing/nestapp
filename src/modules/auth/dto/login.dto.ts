import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    @Length(5,20)
    password: string;

}