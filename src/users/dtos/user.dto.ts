import { Expose } from "class-transformer";

export class UserDto{
    @Expose()
    id: number;

    @Expose()
    email: string;
}

// NOTES (SEC 10):
// Creating the UserDto class here for data serialization for out GET request to not include password.
// Here expose keyword/decortaor is used to tell nest that it must always include those fields in the response object.