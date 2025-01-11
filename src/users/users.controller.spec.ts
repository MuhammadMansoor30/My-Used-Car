import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let dummyUsersService: Partial<UsersService>;
  let dummyAuthService: Partial<AuthService>;

  beforeEach(async () => {
    dummyUsersService = {
      findOne: (id: number) =>{
        return Promise.resolve({id, email: "abc@email.com", password: "abc"} as User);
      },
      find: (email: string) => {
        return Promise.resolve([{id: 1, email, password: 'abcd'} as User]);
      }
    };
    dummyAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User);
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: dummyUsersService
        },
        {
          provide: AuthService,
          useValue: dummyAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("findAllUsers returns a list of users with a given email", async () => {
    const users = await controller.findAllUsers("abc@email.com");
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('abc@email.com')
  });

  it("findUsers with agiven id", async () => {
    const user = await controller.findUsers('1');
    expect(user).toBeDefined();
  });

  it("Gives an error if the Provided user id is not found", async() => {
    dummyUsersService.findOne = () => null;   // Overwiting the dummyFindOne method toreturn null so that test passes
    await expect(controller.findUsers('10')).rejects.toThrow(NotFoundException);
  });

  it("Signs In a user and also provides session object", async() => {
    const session = {userId: -10};
    const user = await controller.signIn({email: "abc@email.com", password: 'abc'}, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});


// NOTES (SEC 12):
// Testing the Users Controller file using the same set of pricnciples as used in the auth.service.ts file while tetsing it.
// All info in present in Notes of that file.