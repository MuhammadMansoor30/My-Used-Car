import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/create-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user); 
    }
}

// NOTES (SEC 15):
// Creating reports controller file with different route handlers. Same as in users controller file.
// Getting the current loggedin user details and passing it to the service so that we can create associate between the reports and users.
// After adding associate to the entities we have to pass the user data inside of the rpeoets service so that it links user with it. We will sent the entire user entity but repositiry will extract user id from it and only save it in the db. 