import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

export class AuthService{
    constructor(private userService: UsersService){}
}

// NOTES (SEC 11):
// Creating the auth service file and linking it with userService file to add authetication logic to our app.