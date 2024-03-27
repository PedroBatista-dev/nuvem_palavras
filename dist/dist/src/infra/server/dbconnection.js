"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var dbconnection = mysql2_1.default.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});
dbconnection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    }
    else {
        console.log("Error connecting database ... nn");
    }
});
exports.default = dbconnection;
