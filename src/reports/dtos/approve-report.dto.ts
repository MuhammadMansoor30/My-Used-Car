import { IsBoolean } from "class-validator";

export class ApproveReportDto{
    @IsBoolean()
    approved: boolean;
}

// NOTES (SEC 16):
// Creating an approvie report dto to use it as a patch request body so that we can approve or unapprove a report.
// User can either approve report or un approve a report/