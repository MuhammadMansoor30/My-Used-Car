import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)  private repo: Repository<User>){}

    create(email: string, password: string){
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    findOne(id: number){
        if(!id){
            throw new NotFoundException("No user for Null or Provided Id");
        }
        return this.repo.findOne({where: {id}});
    }

    find(email: string){
        return this.repo.find({where: {email}});
    }

    async update(id: number, attr: Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("No User Found");
        }
        Object.assign(user, attr);
        return this.repo.save(user);
    }

    async remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("No User Found");
        }
        return this.repo.remove(user);
    }
}

// NOTES (SEC 9):
// In this file we will define the service file for our users which hold all its business logic.
// Since we have used typeorm we dont have to define repository file itself as it is provided to us by typeorm after creating the entity and adding the entity to different modules.
// Now here we will use InjectRepository to inject the dependency of repository to our service file.
// We will define the Respository file with generic type of the repository we want to define like in this case of user.
// Then we will use the create method to create an instance of userEntity and save methods saves/commits it to db.
// The Object.assign method copies the content of the provided object in 2nd arg to the 1st argument object relapcing the duplicates which is helpful for updating records.
// Here argumnet "attr" is of type Partial<User> which is a datatype provided by typescript to get the attributes of the provided generic like in our case user. The partial means that it can have single, none or all attributes of the object provided.