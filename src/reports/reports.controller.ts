import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../users/decorators/create-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user); 
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    approveReport(@Param("id") id: string, @Body() body: ApproveReportDto){
        return this.reportsService.changeApproval(id, body.approved);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto){
        return this.reportsService.createEstimate(query);
    }
}

// NOTES (SEC 15 + 17):
// Creating reports controller file with different route handlers. Same as in users controller file.
// Getting the current loggedin user details and passing it to the service so that we can create associate between the reports and users.
// After adding associate to the entities we have to pass the user data inside of the reports service so that it links user with it. We will sent the entire user entity but repositiry will extract user id from it and only save it in the db.
// Adding in the getEstimate function to get the estimated price of the car based on the certain inputs which are defined in getEstimateDto file.