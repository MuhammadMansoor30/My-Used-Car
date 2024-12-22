import { IsEmail, IsString } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

// NOTES (SEC 8):
// DTos are created to add validations to the objects and body requests.
// More info in messages-nest-app.