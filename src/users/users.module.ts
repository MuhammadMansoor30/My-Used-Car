import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, AuthService, 
    // {provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor}
  ]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}


// NOTES (SEC 8 + 11 + 16):
// In DI system the providers array is the list of services which are required by the Dependency Injection container.
// Using the TypeOrm method to add the entitiy to its parent module.
// This will help in creating the repository for storing data.
// Other info in App.module file.

// Adding the AuthService to the user.module providers so that it is available to the entire userModule using Dependecny Injection
// Adding the currentUserInterceptor created to get the current user to the providers list to use in the controllers file.
// Adding the APP_INTERCEPTOR import to use the CurrentUserIntercpetor class as a globally scoped interceptor.
// Using this approach this CurrentUserInterceptor is applied to the entire application regardeless of any module, service or controller.

// Commenting/Removing the CurrentUserInterceptor as a provider to change it to the currentUserMiddleware.
// The middleware definition will be done here in the same way as done in the app.module.ts file.
// The purpose of why it is done is mentioned in the admin.guard.ts file Important Points section.