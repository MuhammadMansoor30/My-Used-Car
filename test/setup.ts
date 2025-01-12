import { rm } from "fs/promises";
import { join } from "path";

global.beforeEach(async () => {
    try{
        await rm(join(__dirname, "..", "test.sqlite"));
    }
    catch(err){}
});

// NOTES (SEC 14):
// Creating a global setup.ts file to delete the test.sqlite db before each test is run.
// This is done so that no error occurs and we dont have to change entires/values everytime to run tests.
// Also we will add new entry to the jest-e2e.json file so tahtw e can run this file after envs are ran.
// For this we will use the remove function "rm" of the Node and use the join function to join the file path.
// The 1st arg of the join function is "__dirname" whihc is the current directory, 2nd arg is ".." which menas go up 1 dir can be change to go to other places, 3rd arg is the "test.sqlite" file name to delete. 
// Adding try catch so that if file is already deleted it ctaches the err and keeping catch blank so it doesnt show error.