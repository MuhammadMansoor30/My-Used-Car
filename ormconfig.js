const { DataSource } = require("typeorm");

const dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.ts'],
    cli: {
        migrationsDir: 'migrations',
    }
};

switch (process.env.NODE_ENV) {
    case "development":
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ["**/*.entity.js"],
        });
        break;
    case "test":
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ["**/*.entity.ts"],
            migrationsRun: true,
        });
        break;
    case "production":
        Object.assign(dbConfig, {
            type: "postgres",
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ["**/*.entity.js"],
            ssl: {
                rejectUnauthorized: false
            }
        });
        break;
    default:
        throw new Error("Unknown Environment");
}

const dataSource = new DataSource(dbConfig);
module.exports = dataSource;

// NOTES (SEC 18):
// Creating the ormconfig.js file to add database configurations for each environment.
// Each environment will have its own database and configurations.
// This is to tell TypeORM about different environment we have in our NEST project and each having different Dbs.
// Adding the migrations and its cli for Dir in the dbCOnfig object to copy the Db contents after we have setup our project.
// This is done because we have set syncronize to false and we now need migrations to copy the Database structure and tables from actual project to Db. All this configurations are for typeORM migrations to setup and run.
// We can create migration using command: npm run typeorm migration:generate -- migrations/initial-schema -d ./{configfileName}.js
// If file is in typescript we will use the "-o" flag to convert the file into plain JS file as typeorm doesnot work with TS.
// The generate migration command will look into the project entities and generate commands to run when we will run the migration and save these all commands in the migrations folder.
// In newer versions of TypeORM CLI we need to create dataSource from our config file to run mirations in older versions it was not required.
// To run the migrations so that our database structure is created in DB we will use command: 
// -> npm run typeorm migration:run -- -d ./{configFileName}.js
// Setting the migrations run property to True so that migrations are ran for each environemnt as well.
// Setting up the production case to include psotgres database and also installing postgres driver for typeorm using 'npm i pg' 