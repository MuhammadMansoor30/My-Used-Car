import { Controller, Post, Body, Patch, Param, Query, Get, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        return this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUsers(@Param('id') id: string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException("User Not Found");
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number){
        return this.userService.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body);
    }
}

// NOTES (SEC 8):
// Creating the controller file to define all the route handlers and differnt http methods to make requests for data.
// Linking the service with controller using the DI and calling the create method of service to create a new user record.