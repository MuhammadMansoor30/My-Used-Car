import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude} from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({value}) => parseFloat(value))
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @Transform(({value}) => parseInt(value))
    mileage: number;
}

// NOTES (SEC 16):
// Creating a get estimate dto to add fields to estimate the price of the Car.
// This route will be used to get the estimate price for our car. 
// Using Transformer decorator again here to transform soem data into our desired type.
// Transformer basically processes the value and converts into other value of our likings.
// In this case we are doing it so that our getEstimate route works fine.
// Since we are passing data using query param everyting is considered as string so validator is giving error on number fields.
// Using value to get the value of year out of it. "obj" as used earlier will get the entire object from it and the "value" will get the specific field value form the request. It is earlier used in the "report.dto.ts" file.