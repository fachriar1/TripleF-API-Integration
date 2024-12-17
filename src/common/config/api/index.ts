import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  ENV: process.env.NODE_ENV,
  PORT: process.env.APP_PORT,
  VERSION: process.env.APP_VERSION,
  NAME_PROGRAM: process.env.NAME_PROGRAM,
  CRYPTO_SECRET: process.env.CRYPTO_SECRET,
  BASE_URL: process.env.BASE_URL,
  RELEASE_DATE: process.env.RELEASE_DATE,
  BCRIPT_SECRET: process.env.BCRIPT_SECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
  AWS_BUCKET_URL: process.env.AWS_BUCKET_URL,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
}));
