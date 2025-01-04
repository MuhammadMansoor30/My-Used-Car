import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        return request.session.userId;
    }
}

// NOTES (SEC 11):
// Creating authGuard to apply permission to access differnt router handlers.
// Guards are used to prevent access to specific routes, controllers or entire app to a given user.
// Using guard we can authorize users to access certain parts of our app.
// Guards can be used at controller, route handler and app levels.
// To create a guard we simple create a class and implement the CanActivate interface.
// The canActivate interface has a canActivate method which returns a boolean. If true user can access if false then no access.