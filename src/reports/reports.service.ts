import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>){}

    create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean){
        const report = await this.repo.findOne({where: {id: parseInt(id)}});
        if(!report){
            throw new NotFoundException("No Report Found");
        }
        report.approved = approved;
        return this.repo.save(report);
    }

    createEstimate({make, model, lng, lat, year, mileage}: GetEstimateDto){
        return this.repo.createQueryBuilder()
            .select("AVG(price)", "price")   // Calculating average Price and assigning it to column price just like in SQL
            .where("make = :make", {make})
            .andWhere("model = :model", {model})
            .andWhere("lng - :lng BETWEEN -5 AND 5", {lng})
            .andWhere("lat - :lat BETWEEN -5 AND 5", {lat})
            .andWhere("year - :year BETWEEN -3 AND 3", {year})
            .andWhere("approved IS TRUE")
            .orderBy("ABS(mileage - :mileage)", "DESC")
            .setParameters({mileage})
            .limit(3)   // Get only 3 records
            .getRawOne();
    }
}

// NOTES (SEC 15 + 17):
// Creating the report service file to add logic for the controller methods. Same as in User Service file.
// Modifying the create method to have user as an argumet as well. This is so we can create an association b/w user and reports.
// Here after creating the report we will add the user to the reports entity so that the relation can be defined and saved in db.

// Creating the createEstimate method to add the logic of creating an estimated price of the car.
// We will be using createQueryBuilder method of the TypeORM onto the reports table.
// The createQuerBuilder method helps us to write more complex queries with ease and its syntax is similar to SQL queries.
// Writing the complex query with queryBuilder to filter data on specific criteria.
// getRawManty() is used to get many records from query and getRawOne() is used to get single record from Db.
// In order to apply multiple where conditions first we will use where() func and then we will use andWhere() for every other as where overides where statemnet. The 2nd arg of the where() is the data we want to apply condition on.
// In lng, Lat we subtract the value so that can check if our value is between specific range or not to filter the data.
// The ABS is used to find the absolute of value and AVG function is used to get the avergae of value.
// The orderBy does not takes a second argument so we will use sendParameters() func to send values for order by clause.
// In orderBy we are subtracting mileage so that we can get record based on the closest mileages.
// select('*') to get all values and select("price") to get only price same as in SQL. 
// Also Getting only those reports for estimate that are approved by the admin.