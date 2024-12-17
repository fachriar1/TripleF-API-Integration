import {registerAs} from "@nestjs/config";
export default registerAs("main-db", () => ({
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    NAME: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
}));
