import { Controller, Post, Body, Patch, Param, Query, Get, Delete, NotFoundException, UseInterceptors, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/create-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)   // Removing It as we are usign Globally Scoped Interceptor
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/abc')
    @UseGuards(AuthGuard)
    getUser(@CurrentUser() user: User){
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any){
        return session.userId = null;
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

// NOTES (SEC 8 + 11):
// Creating the controller file to define all the route handlers and differnt http methods to make requests for data.
// Linking the service with controller using the DI and calling the create method of service to create a new user record.
// We can use these cutsom or other interceptors for data serialization on entire controller as well as for each specific request handler based on our needs.

// Adding the Session decorator to update the session object whenever the user signup or signin based on the session cookies defined in main.ts file.
// The session object is used to maintain the state of the user so that we can check if the user is actually signed in and persist it in the application.
// Using the UseInterceptors decorator to use our own CurrentUserIntercpetor to get the current user detail and also change the type of user we are getting from the CurrentUser decorator to the user entity we have created.
// The above point is old and used only if we are using locally scoped intercpetor for each file. Instead we have now used Globally scoped intercpetors which are applied to our entire application.
// Adding the useGuards decortaor to apply the guards to our route handler, guards can be applied to controller, app and routes levels. Here we have used our AuthGuard which check if user is signin or not if not doesnt allow access to this route.