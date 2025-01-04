import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.CurrentUser;
    }
); 

// NOTES (SEC 11):
// Creating our own custom decorator to get the current user.
// The current user decorator will be used to tell the application that who the current user is and which things he is allowed to access like which routes.
// Here we will use th createParamDecorator function and its fist arg is the function which takes data and context.
// Data is the data used to get the crrent user and ExecutionCOntext is the incoming request Like Http, Grpc, GraphQl or else.
// Setting the data property type to never will tell the decorator and other staht this decorator doesnt need any data to work rather it will work based on the context.
// Here we will use the context to switch to Htpp request and get the request obj. The Request obj has access to teh session.
// We can use this to access our session values.
// Also one point to note is that we also need userService to get all the info about the user.
// For that we need to create an interceptor as Decorators work outside of the DI system and Interceptors work with DI.
// We cannot directly access user services inside of the decorator for this an interceptor is needed.
// Getting the currentUser from the request which we have added using the cutsom current-user interceptor defined.