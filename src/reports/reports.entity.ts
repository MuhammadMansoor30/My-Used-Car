import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Report{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default: false})
    approved: boolean;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @ManyToOne(() => User, (user) => user.reports)
    user: User
}

// NOTES (SEC 8 + 15 + 16):
// Same as in user.entity file.

// We will use ManyToOne() decorator to link the user entity with reports entity as the relation between reports and user isn one-to-many menaing that one user can have many reports.
// To add this association in Nest we have two decorators OneToMany applied on user entity and ManyToOne applied on report entity.
// The arguments of these decorates are functions which tell about which fields to target while creating relation/assocation between 2 entities. The user.reports means that this field is linked with reports field in user entity.
// The ManyToOne Decorator will make chnages to the db as it will add userId field to the reports entity to link both together.
// These associate are same as SQL relations of 1-1, 1-Many and Many-Many. 

// Adding the approved property to the report entity so we can approve or reject a report. By default the approved is false.