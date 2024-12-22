import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reports{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    price: number;
}

// NOTES (SEC 8):
// Same as in user.entity file.