import {AfterInsert, Entity, Column, PrimaryGeneratedColumn, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string;

    @AfterInsert() // A hook
    logInsert(){
        console.log("Inserted user with id ", this.id);
    } 

    @AfterUpdate()
    logUpdate(){
        console.log("Updating user with id ", this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log("Removing user with id ", this.id);
    }
}

// NOTES (SEC 8 + 9):
// Creating the user entity here to define the properties of the users to store in the db.
// Here we have used decorators from the typeorm to define the entity, primary key column and other columns.
// Now we will add this entity to the parent module i.e the user module to create the repository.
// Then we will add this entity to the app module to allow it to be availabe to all other modules.
// There are some hooks available to us in typeorm which we can use in the entity file so thaht we can perform certain opertations after certain DB operations like insert, update and remove.
// These hooks are available as decorators and are applied on functions.