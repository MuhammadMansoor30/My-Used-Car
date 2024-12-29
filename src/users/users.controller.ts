import { Controller, Post, Body, Patch, Param, Query, Get, Delete, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        return this.userService.create(body.email, body.password);
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))  // Replacing using custom decorator defined in interceptors fldr
    @Get('/:id')
    async findUsers(@Param('id') id: string){
        console.log("Request handler running");
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
// We can use these cutsom or other interceptors for data serialization on entire controller as well as for each specific request handler based on our needs.