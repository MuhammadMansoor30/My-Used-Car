import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if(!request.currentUser){
            return false;   
        }
        return request.currentUser.admin;   // Return value of admin property on user i.e either false or true.
    }
}

// NOTES (SEC 16):
// Creating an Admin gurad to guard specific routes which are only allowed to admins.
// In this we will check the admin property of users and see if its tru or false.
// In general this guard will help us in creating an authorization feature for our app.
// First check if currentUser proeprty is setup by our custom serializer interceptor to check the current logged in user.
// If not logged in return false else check the admin property and return true if admin property is true.

// Important Point:
// In Nestjs environment the sequence of execution matters the most.
// When the application instance is craeted firstly all the middlewares are executed defined in the app.module file.
// Then all the guards defined will be executed. Then all the interceptors and serializers along with the request will be exec.
// The interceptors can be executed before and after the requests.
// These points are important as we cannot use an interceptor to check for the currentUser as in order to apply authorization the gurad needs user to be defined first and interceptor which sets the currentUser is ran after guard so it will neve work
// So we will have to convert the currentUser interceptor into a middleware like we have done with the cookie-session lib in the app.module file to run it before guard and apply authorization correctly.