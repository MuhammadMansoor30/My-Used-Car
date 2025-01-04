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
            request.CurrentUser = user; 
        }
        
        return handler.handle();
    }
}

// NOTES (SEC 11):
// Creating a custom interceptor with dependency injection to have access to the request object and adding our user to the request
// This will be used with the decorator created so that we can have access to the user and can also confirm that the user we have in the session also exists in the database.
// As mentioned in other project any class with Injectable marked decortaor can be make part of the DI system and can be added to the providers list of any module.
// FOr this interceptor we will do the same by adding it to the providers list of the UserModule. 