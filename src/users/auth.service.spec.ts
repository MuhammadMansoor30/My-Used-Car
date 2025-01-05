import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("Auth Service", () => {
    let authService: AuthService;
    let dummyUsersService: Partial<UsersService>;

    beforeEach(async () => {
        dummyUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User), 
        };
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: dummyUsersService
                }
            ]
        }).compile();   // Creates a new Dependency Injection (DI) container
    
        authService = module.get(AuthService);
    }),

    it("can create an instance of the Auth Service", () => {
        expect(authService).toBeDefined();
    });

    it("creates a new user with a salted and hashed password", async () => {
        const user = await authService.signup("abc@email.com", 'abcd');

        expect(user.password).not.toEqual('abcd');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();

        // Testing to ensure that user password is salted and hased and password supplied is not equal to the stored password. 
    });

    it('signups using a email which is already in use', async () => {
        dummyUsersService.find = () => Promise.resolve([{id: 1, email: 'abc@email.com', password: 'abcd'} as User]);
        // Updating the find method so that we can check that user already exists.
        await expect(
            authService.signin('abc@email.com', 'abcd'),
        ).rejects.toThrow(BadRequestException); 

        // Testing and throwing bad request exception is user signups with an existing email.
    });

    it('throws if user signin with an unused email', async () => {
        await expect(
            authService.signin('asdffg@email.com', "asdfghj"),
        ).rejects.toThrow(NotFoundException);
    });

    it("throws error if user signsin with an incorrect password" , async () => {
        dummyUsersService.find = () => Promise.resolve([{id: 1, email: "abc@email.com", password: 'pass'} as User]);
        // Find method always returns the user which we have provided above as in testing we will use dummy data.
        await expect(
            authService.signin("abc@email.com", 'abcd'),
        ).rejects.toThrow(BadRequestException);
    });

    it('Signs In a user if correct password is provided', async () => {
        dummyUsersService.find = () => Promise.resolve([{id: 1, email: 'abc@email.com', 
            password: '85c6fe95c00ddeb4.960428c9ba8e5361afdebdee7afb5657bad7fae54d82b8e3ad4237701c7bb588'} as User]);

        const user = await authService.signin('abc@email.com', 'mypassword');
        expect(user).toBeDefined();

        // Creating a new user to check the hash password and using that same password to sign the user in.
        // const user = await authService.signup('abc@gmail.com', 'mypassword');
        // console.log(user);
    });
});

// NOTES (SEC 12):
// Creating a spec file to unit test the auth.service functionality. It follows JEST testing.
// Unit testing is used to test individual functions of the application and ensure there functionality.
// For testing authservice we will need an instance of AuthService file and UserService file.
// For UserService we will not use the original userService rather we will create a dummy one as original one depends upn the repository and which depends on the sqlite db so difficult to create and initiate.
// Firstly we will create a DI container to create the structure like our application and then we will get the service from the module we have just created.
// We will also create dummy usersService which similar structure to user service file an dmethods.
// Then we will check if the authService instance is created or not.
// In DI system the providers array is the list of services which are required by the Dependency Injection container.
// Specifying the type of dummyUsersService to Partial<UsersService> so that we can tell typescript that we want the methods with same structure as in UsersService and Partial denotes that not all methods of UsersService are required.
// Also specifying the type of create method as User since our UserEntity has some other function which we dont want to implement so by providing the type of User entity typescript can cover that for us.