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
    setupApp(app);   // Calling the helper function to get config options to testing env
    await app.init();
  });

  it('Tests the Signup functionality of our application)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')  // A post request to the server
      .send({email: "absc@email.com", password: "abc"})   // Body data to send to the server
      .expect(201)   // Status code we expect to return
      .then((res) => {
        const {id, email} = res.body;   // Since we will get id, email from our body
        expect(id).toBeDefined();
        expect(email).toEqual('absc@email.com')
      });  // Getting the response obj and checking for its values. 
  });
});

// NOTES (SEC 13):
// Creating authtication system end-to-end tetsing file to test the signin and signup functionalites.
// We will test it using  adifferent approach then unit testing as e2e makes request to the server/entire app.
// So we will check for status codes and reponses that is being recieved from that app to test it.
// Setup App helper function is used to get the configs of developement app into the testing env.
// More in setup-app file. Later will change it with more Nest appropriate approach but can use it as well.