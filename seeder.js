const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const colors = require("colors");
const fs = require("fs");
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

const connectDB = require("./config/db");



// connectDB
connectDB();

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);

        console.log("Import data".green.bgWhite);
    } catch (err) {
        console.error(err);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();

        console.log("data deleted".red.bgYellow);
        process.exit(1);
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === "-i") {
    importData()
} else if (process.argv[2] === "-d") {
    deleteData()
}



