import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global{
    namespace Express{
        interface Request{
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private usersService: UsersService){}

    async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session || {};

        if(userId){
            const user = await this.usersService.findOne(userId);
            // @ts-ignore
            req.currentUser = user;
        }

        next();  // Executes the next middleware in order like we do in Node/Express.
    }
} 

// NOTES (SEC 16):
// Creating a middleware class for the purpose of getting the current user.
// After replcing the currentUser interceptor we have converted into the middleware.
// More info about why we have done this and why it is needed is present in the admin.guard.ts file important point section.
// Marking the middleware class as Injectable to make it a part of DI sysytem so that we can use UserService in it.
// The middlware "use" function is same as that of the middleware function we create in the MERN Stack in the express node.
// The concept of middleware is same throughour Node, Express and Nestjs.
// Declaring the Express Request interface again and adding currentUser property to it. Since Express Request interfcae does not have this property so we need to add it so that we can access the cuurentUser from it.
// Here saying that in the Request interface inside of teh Express library add a currentUser property which can also be null and set it to the User entity value.