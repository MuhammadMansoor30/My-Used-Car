import { DataSource } from "typeorm";

const dbConfig: any = {
    synchronize: false,
    migrations: ['migrations/*.js'],
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

export const dataSource = new DataSource(dbConfig);
export const dbOptions = dbConfig;

// NOTES (SEC 18):
// Other setps same as in the ormconfig.js file.
// These commands are used to finally run and generate the migrations.
// We cannot use the ormconfig.js file with new typeorm version as it doesnt know about Datasource and gives error.
// We can save these commands in the scripts file ith specific names like migration:generate and migration:run to easilty execute them everytime so that we dont have to type long names
// For fist time when running we have to create migration folder ourselves so that ts can know where to save them.
// command to generate migration: npm run typeorm migration:generate --  -d ./{datsource file name}.ts -o ./migrations/{name of migr}
// command to Run Migration: npm run typeorm migration:run -- -d ./{datsource file name}.ts
