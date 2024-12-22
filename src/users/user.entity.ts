import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string;
}

// NOTES (SEC 8):
// Creating the user entity here to define the properties of the users to store in the db.
// Here we have used decorators from the typeorm to define the entity, primary key column and other columns.
// Now we will add this entity to the parent module i.e the user module to create the repository.
// Then we will add this entity to the app module to allow it to be availabe to all other modules.