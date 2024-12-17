import { registerAs } from '@nestjs/config';

export default registerAs('logs-db', () => ({
  URI: process.env.DB_LOGS_URI,
}));
