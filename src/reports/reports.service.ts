import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

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
}

// NOTES (SEC 15):
// Creating the report service file to add logic for the controller methods. Same as in User Service file.
// Modifying the create method to have user as an argumet as well. This is so we can create an association b/w user and reports.
// Here after creating the report we will add the user to the reports entity so that the relation can be defined and saved in db.