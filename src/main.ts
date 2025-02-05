import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   keys: ['abcdefg']
  // }));
  // app.useGlobalPipes(
  //   new ValidationPipe({whitelist: true})
  // );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// NOTES (SEC 8 + 11 + 13):
// Adding in the validation DTOs using the nestjs validation pipes.
// More info in messages-nest-app.

// Adding in the Cookie-session libraries to hanlde the session of outr application using cookies.
// The import statement does not work with cookie-session because of some typescript configurations in the tsconfig.json file.
// So we will use other way of importing like in express and node using the require keyword.
// The cookie-session oject requires a 'key' param which will be used to encrypt the session value. It can be any random string.  

// Can also change the configs on Pipes and cookies with the helper function created in setup-app file since both are same.
// Removing the Validation Pipes and Cookies Middleware from main.ts file to app.module.ts file to bring them to global level.
// Using this approach we dont need to define helper functions to test our e2e code as Tetsing env will aitomatically get the Pipes and Cookies when creating instance of app Module.