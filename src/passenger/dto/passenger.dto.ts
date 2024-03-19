import { IsNotEmpty, IsString } from "class-validator";

export class PassengerDTO{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty({message: 'El campo es obligatorio'})
    @IsString()
    readonly email: string;
}