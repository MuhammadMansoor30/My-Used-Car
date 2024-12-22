import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body);
    }
}

// NOTES (SEC 8):
//cCreating the controller file to define all the route handlers and differnt http methods to make requests for data.