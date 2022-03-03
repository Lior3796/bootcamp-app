const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/bootcamps");
const morgan = require("morgan");
const colors = require("colors")
const connectDB = require("./config/db");

// loading env
dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDB();


const app = express();

// body-parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", router);


const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`We live in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold));

// handle unhandle errors
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)

    server.close(() => process.exit(1));
})