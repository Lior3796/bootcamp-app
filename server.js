const express = require("express");
const dotenv = require("dotenv");


// loading env
dotenv.config({ path: "./config/config.env" });

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const morgan = require("morgan");
const colors = require("colors")
const errorHandler = require("./middleware/errorHandler")
const connectDB = require("./config/db");


// connect to DB
connectDB();


const app = express();

// body-parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);


app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`We live in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold));

// handle unhandle errors
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)

    server.close(() => process.exit(1));
})