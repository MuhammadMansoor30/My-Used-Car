import { NestInterceptor, ExecutionContext, Injectable, CallHandler } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userService: UsersService){}

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};
        if(userId){
            const user = await this.userService.findOne(userId);
            request.currentUser = user; 
        }
        
        return handler.handle();
    }
}

// NOTES (SEC 11 + 16):
// Creating a custom interceptor with dependency injection to have access to the request object and adding our user to the request
// This will be used with the decorator created so that we can have access to the user and can also confirm that the user we have in the session also exists in the database.
// As mentioned in other project any class with Injectable marked decortaor can be make part of the DI system and can be added to the providers list of any module.
// For this interceptor we will do the same by adding it to the providers list of the UserModule. 

// For Section 16 we wont be using the current user interceptor instead we wil replce it with current user middleware.
// The working and code of both tese is similar but their time of execution in the Nestjs code is different.
// More info about why we are doing this change is present in the admin.guard.ts file Important Point section. 