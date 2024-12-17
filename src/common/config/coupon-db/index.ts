import { registerAs } from '@nestjs/config';
export default registerAs('couponDB', () => ({
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASS,
  NAME: process.env.DB_NAME,
  URI: process.env.DB_LOGS_URI,
}));
