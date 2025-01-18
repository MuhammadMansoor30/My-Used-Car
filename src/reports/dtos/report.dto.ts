import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    price: number;

    @Expose()
    mileage: number;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;

}

// NOTES (SEC 15):
// Similar to that for the UserDto created in users folder.
// Done so we can specify whch fields we want to expose in teh final reposne. We dont want entire userObject in the repsonse of the report obj.
// We can also add new proeprties to the Dto whcih will appear in the final repsonse where we will use this Dto.
// Using the Transform decortaor from the transformer class we can add a new field based on some transformations from teh given entity default fields. Here "obj" refers to the original report entity object and it will extract user.id proeprty from that entity and pass it to new field of userId.