import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from './../src/setup-app';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);   // Calling the helper function to get config options to testing env. Removing it as other approach is used
    await app.init();
  });

  it('Tests the Signup functionality of our application)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')  // A post request to the server
      .send({email: "absc1@email.com", password: "abc"})   // Body data to send to the server
      .expect(201)   // Status code we expect to return
      .then((res) => {
        const {id, email} = res.body;   // Since we will get id, email from our body
        expect(id).toBeDefined();
        expect(email).toEqual('absc1@email.com')
      });  // Getting the response obj and checking for its values. 
  });

  it("Signups a user and gets the currently logged in User", async() => {
    const email = "abc@email.com";
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password: "abc"})
      .expect(201)
    
    const cookie = res.get('Set-Cookie');  // Get the Cookie From the response headers
    const {body} = await request(app.getHttpServer())
      .get("/auth/abc")
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toEqual(email);
  });

});

// NOTES (SEC 13 + 14):
// Creating authtication system end-to-end tetsing file to test the signin and signup functionalites.
// We will test it using  adifferent approach then unit testing as e2e makes request to the server/entire app.
// So we will check for status codes and reponses that is being recieved from that app to test it.
// Setup App helper function is used to get the configs of developement app into the testing env.
// More in setup-app file. Later will change it with more Nest appropriate approach but can use it as well.

// By default Nest follows the Jest testing and jest rund e2e tests in parellel like if there are 2 file both will run at once.
// SQL dbs like Sqlite doesnt like it and may lock the database for transactions as multiple reqs are made at same time.
// If this errors occurs of locking database go to the package.json file and in the teste:e2e entry add "--maxWorkers=1" to the end of the value so it always runs single file at a time. This also speeds up the tests.
// Creating a new test to check the loggedin user. For this we need to have access to cookie so we can pass it to the other req.
// As Testing lib cannot access or set cookie we will manually access and set the cookie to teh req and make the request to test.