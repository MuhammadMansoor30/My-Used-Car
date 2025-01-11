import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export const setupApp = (app: any) => {
    app.use(cookieSession({
        keys: ['abcdefg']
    }));
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true })
    );
}

// NOTES (SEC 13):
// Creating a setup app function which takes app as 2st argument to add cookies and pipes to our application.
// This code is takesn from the main.ts file and are extra config for our application.
// To run the code in testing env we need these things as by default testing env creates instance of appModule and not main.ts.
// So by creating this helper function we can use these extra things added to our app in our testing env.
// This is not Nest Specific way of doing things but it is much simpler and is easy to understand.
// The Nest specific way is a bit length and complex so it is entirely up to us to use whichever we want in our own app.