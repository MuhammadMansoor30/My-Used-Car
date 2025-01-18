import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude} from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(10000000)
    price: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}

// NOTES (SEC 15):
// Creating a report dto to add validations to the body for Post requests. Same as in create-user dto. 
// The Min and Max decorators as the name suggests are used to check for values within the range provided.
// The Islongitude and IsLatitude deocrators are used to check the long and lat vlaues for their validity.