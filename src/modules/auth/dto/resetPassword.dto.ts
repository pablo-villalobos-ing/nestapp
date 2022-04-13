import { IsNotEmpty, IsString, isString, IsUUID, Length } from "class-validator";

export class ResetPassword{
    @IsNotEmpty()
    @IsUUID('4')
    resetPasswordToken: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(6,20)
    password:string;
}