const express = require("express");
const dotenv = require("dotenv");

// loading env
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`We live in ${process.env.NODE_ENV} mode on port ${PORT}`))