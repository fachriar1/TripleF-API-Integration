import * as winston from 'winston';
import * as appRoot from "app-root-path"
import * as dotenv from "dotenv"
dotenv.config({path: process.env.NODE_ENV === 'development' ? `.env.${process.env.NODE_ENV}` : `.env`})
const nameProgram = process.env.NAME_PROGRAM

export default {
    error: new winston.transports.DailyRotateFile({
        filename: `${appRoot}/../logs/${nameProgram}/error/%DATE%.log`,
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxFiles: "14d",
        maxSize: "100m",
        frequency: "1h"
    }),
    combine: new winston.transports.DailyRotateFile({
        filename: `${appRoot}/../logs/${nameProgram}/combine/%DATE%.log`,
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxFiles: "14d",
        maxSize: "100m",
        frequency: "1h"
    }),
    console: new winston.transports.Console({
        format: winston.format.simple()
    }),
}


