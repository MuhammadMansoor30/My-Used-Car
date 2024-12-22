import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Reports } from './reports/reports.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Reports],
    synchronize: true
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// NOTES (SEC 8):
// Creating a dabase connection in the AppModule using the TypeOrm.
// TypeOrm works with various databases like: sqlite, postgres, mysql, mongodb. Mongoose is a typeorm only for MongoDb.
// Later in this project we will switch to postgresql.
// Here we have added a TypeOrmModule and called its forRoot function to allow Orms to be avaiable to the entire project.
// We have defined our database name and its type and set the syncronise to true.
// THe entitile array will hold different entities defined by us in the application.
// These are just file which specify what data will be added to the databse like its structure.
// Also the repository files will be generated for us and we only have to define the entities.
// Adding the User and Reports entity to be available to th entire application.