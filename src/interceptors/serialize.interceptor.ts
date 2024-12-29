import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor{
    new (...args: any[]): {}  
} // Creating custom interface so that we can only accept classes as dtos to apply some type safety.

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {}  // Creating constrcutor here to allow customDts for every request to serialize.

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
               return plainToClass(this.dto, data, {excludeExtraneousValues: true});
            })
        );
    }
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

// NOTES (SEC 10):
// Implementing the custom data serializaton class to intercept the incoming request and modify it for our likings.
// We can use the inbuilt intercletor using the Exclude decirator inside of entity class to exclude specific fields and use the ClassSerializationInterceptor on the request handler as we will use our custom but that will allow only basic exclusion.
// For custom serialization we have to implement our own serialization technique.
// Interceptors are like middlerwares which can look through and intercept the incoming requests and response.
// We will use these interceptors to modify our responses.
// Here we have implemented the NestInterceptor interface which provides intercept method to us.
// By using all these imports we can implement the interceptor method and apply our custom serialization.
// The plainToClass method is used to convert plain object into an instance of class so that we can apply serialization based on that class we want our object to look like.
// Also the options object is added to add a field and set it to true so that only those fields of that class are added to the response that are marked with the expose decorator and all else are left out.
// Creating the serialize function to create our very own custom decorator so that we can use it in the controller file to make imports less and make code readable.
// Decorators are by themselves functions so we can create them using function syntax of JS/TS.