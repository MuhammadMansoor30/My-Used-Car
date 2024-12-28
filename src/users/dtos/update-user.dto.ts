import { IsEmail, IsString, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}

// NOTES (SEC 9):
// Same as that of the create user dto with extra decorator of isOptional to mark fields optional.