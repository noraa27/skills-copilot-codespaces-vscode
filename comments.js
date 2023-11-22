// Create web server application with Express
// to handle HTTP requests and responses
// using the Express module.
// Load the Express module
const express = require("express");
// Create an Express web server object
const app = express();
// Load the MySQL database module
const mysql = require("mysql");
// Load the Body Parser module
const bodyParser = require("body-parser");
// Load the CORS module
const cors = require("cors");
// Load the Moment module
const moment = require("moment");
// Load the DotEnv module
const dotenv = require("dotenv");
// Load the Moment Timezone module
const momentTimezone = require("moment-timezone");
// Load the Node Mailer module
const nodemailer = require("nodemailer");
// Load the Multer module
const multer = require("multer");
// Load the Path module
const path = require("path");
// Load the FileSystem module
const fs = require("fs");

// Configure the DotEnv module
dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  // Database host
  host: process.env.DB_HOST,
  // Database user
  user: process.env.DB_USER,
  // Database password
  password: process.env.DB_PASS,
  // Database name
  database: process.env.DB_NAME,
  // Database port
  port: process.env.DB_PORT,
  // Database timezone
  timezone: process.env.DB_TIMEZONE,
  // Database connection limit
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

// Configure the Body Parser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure the CORS module
app.use(cors());

// Configure the Moment module
moment.locale("en");
moment.tz.setDefault("Asia/Manila");

// Configure the Multer module
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Configure the Node Mailer module
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Configure the Path module
app.use("/images", express.static(path.join(__dirname, "public