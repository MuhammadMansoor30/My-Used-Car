import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}


// NOTES (SEC 8):
// Using the TypeOrm method to add the entitiy to its parent module.
// This will help in creating the repository for storing data.
// Other info in App.module file.