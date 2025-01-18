import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),   // Getting name of the db env variable
          entities: [User, Report],
          synchronize: true
        }
      }
    }),
    // Old TypeOrmModule usage before adding ConfigModule and ConfigService
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Reports],
    //   synchronize: true
    // }), 
    UsersModule, ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }   // Adding validation Pipe to provide to entire application
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ['abcdefg']
    })).forRoutes('*');
  }
}

// NOTES (SEC 8 + 13 + 14):
// Creating a dabase connection in the AppModule using the TypeOrm.
// TypeOrm works with various databases like: sqlite, postgres, mysql, mongodb. Mongoose is a typeorm only for MongoDb.
// Later in this project we will switch to postgresql.
// Here we have added a TypeOrmModule and called its forRoot function to allow Orms to be avaiable to the entire project.
// We have defined our database name and its type and set the syncronise to true.
// THe entitile array will hold different entities defined by us in the application.
// These are just file which specify what data will be added to the databse like its structure.
// Also the repository files will be generated for us and we only have to define the entities.
// Adding the User and Reports entity to be available to th entire application.

// Adding in the Validation pipes and cookies middleware to keep the e2e tetsing up and running using the Nest based approach.
// More info in main.tes file about why we are doing this.
// Extending the providers to include pipes in it. This utilomtely means that when instance of App is craeted provide every class in the app with the APP_PIPE and use the value of Validation Pipe.
// For adding the cookies session middleware we will use the configure method inside of the the AppModule class which consumes a middleware and creates a globally scoped middleware function for entire app.
// forRoutes() function is used to tell Nest that which routes to apply this middleware in this case * meaning all routes of app.

// Using the config module and configService to get the env information from the env files to our app.
// Adding two new env files one for development an one for testing to specify different dbs for both envs.
// The ConfigModule is used to define that which env file we will use based on the Environment like testing or Development.
// The ConfigService is used to get the info from the env file being used and pass it down to teh application for usage.
// We will use the tweaked version of TypeOrmModule when using ConfigModule and Service.
// We will inject the ConfigService into the DI container an dthen use it in the entire app.
// We will use th cross-env library after installing to add NODE_ENV to our project. In the package.hjson file in the start scripts we will add cross-env NODE_ENV=development/test based on the testing or server start script before the given cmnds.