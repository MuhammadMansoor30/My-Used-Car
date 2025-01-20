import {AfterInsert, Entity, Column, PrimaryGeneratedColumn, AfterUpdate, AfterRemove, OneToMany } from "typeorm";
import { Report } from "src/reports/reports.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string;

    @Column({default: true})
    admin: boolean;

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

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];
}

// NOTES (SEC 8 + 9 + 15):
// Creating the user entity here to define the properties of the users to store in the db.
// Here we have used decorators from the typeorm to define the entity, primary key column and other columns.
// Now we will add this entity to the parent module i.e the user module to create the repository.
// Then we will add this entity to the app module to allow it to be availabe to all other modules.
// There are some hooks available to us in typeorm which we can use in the entity file so thaht we can perform certain opertations after certain DB operations like insert, update and remove.
// These hooks are available as decorators and are applied on functions.

// We will use OneToMay() decorator to link the reports entity with user entity as the relation between reports and user isn one-to-many meaning that one user can have many reports.
// To add this association in Nest we have two decorators OneToMany applied on user entity and ManyToOne applied on report entity.
// The arguments of these decorates are functions which tell about which fields to target while creating relation/assocation between 2 entities. The report.user means that this field is linked with report field in user entity.