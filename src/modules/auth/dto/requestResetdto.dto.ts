import { IsEmail, IsNotEmpty } from "class-validator";

export class RequestResetDto{
    @IsNotEmpty()
    @IsEmail()
    mail: string;
}